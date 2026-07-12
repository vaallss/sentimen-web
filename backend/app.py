from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, re, numpy as np, warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

with open('models/tfidf.pkl','rb') as f:            TFIDF        = pickle.load(f)
with open('models/model_nb.pkl','rb') as f:         NB_TF        = pickle.load(f)
with open('models/model_svm.pkl','rb') as f:        SVM_TF       = pickle.load(f)
with open('models/model_nb_w2v.pkl','rb') as f:     NB_W2V       = pickle.load(f)
with open('models/model_svm_w2v.pkl','rb') as f:    SVM_W2V      = pickle.load(f)
with open('models/model_nb_w2v_smote.pkl','rb') as f:  NB_W2V_S  = pickle.load(f)
with open('models/model_svm_w2v_smote.pkl','rb') as f: SVM_W2V_S = pickle.load(f)
with open('models/scaler_w2v.pkl','rb') as f:       SCALER       = pickle.load(f)

from gensim.models import Word2Vec
W2V = Word2Vec.load('models/w2v_model.bin')
W2V_SIZE = W2V.vector_size

try:
    from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
    from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
    STOPWORDS = set(StopWordRemoverFactory().get_stop_words())
    STEMMER   = StemmerFactory().create_stemmer()
    USE_SASTRAWI = True
except:
    STOPWORDS, STEMMER, USE_SASTRAWI = set(), None, False

def preprocess(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|@\w+|#\w+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    if USE_SASTRAWI:
        tokens = [t for t in text.split() if t not in STOPWORDS]
        text   = STEMMER.stem(' '.join(tokens))
    return text

def vec_tfidf(clean): return TFIDF.transform([clean])
def vec_w2v(clean, scaled=False):
    words = clean.split()
    vecs  = [W2V.wv[w] for w in words if w in W2V.wv]
    v     = np.mean(vecs, axis=0) if vecs else np.zeros(W2V_SIZE)
    v     = v.reshape(1, -1)
    return SCALER.transform(v) if scaled else v

def get_proba(model, X):
    if hasattr(model, 'predict_proba'):
        proba   = model.predict_proba(X)[0]
        classes = model.classes_.tolist()
        return {c: round(float(p)*100, 1) for c, p in zip(classes, proba)}
    if hasattr(model, 'decision_function'):
        df   = model.decision_function(X)[0]
        prob = 1 / (1 + np.exp(-float(df)))
        classes = model.classes_.tolist()
        return {str(classes[1]): round(float(prob)*100, 1), str(classes[0]): round(float(1-prob)*100, 1)}
    pred = model.predict(X)[0]
    return {'Positive':100.0 if pred=='Positive' else 0.0,
            'Negative':0.0   if pred=='Positive' else 100.0}

def predict_all(text):
    clean = preprocess(text)
    vt    = vec_tfidf(clean)
    vw    = vec_w2v(clean, scaled=False)
    vws   = vec_w2v(clean, scaled=True)
    out = {}
    for key, (model, vec) in {
        'nb_tf'     : (NB_TF,    vt),
        'svm_tf'    : (SVM_TF,   vt),
        'nb_w2v'    : (NB_W2V,   vws),
        'svm_w2v'   : (SVM_W2V,  vw),
        'nb_w2v_s'  : (NB_W2V_S, vws),
        'svm_w2v_s' : (SVM_W2V_S,vw),
    }.items():
        out[key] = {'label': str(model.predict(vec)[0]),
                    'proba': get_proba(model, vec),
                    'clean': clean}
    return out

@app.route('/api/predict', methods=['POST'])
def predict_route():
    text = request.json.get('text','').strip()
    if not text: return jsonify({'error':'Teks kosong'}), 400
    return jsonify(predict_all(text))

@app.route('/api/batch', methods=['POST'])
def batch_route():
    try:
        data = request.get_json()
        if not data or 'texts' not in data:
            return jsonify({'error': 'No texts provided'}), 400
            
        texts = data['texts']
        results = []

        for t in texts:
            r = predict_all(t)

            results.append({
                'text': t,
                'nb_tf': r['nb_tf']['label'],
                'svm_tf': r['svm_tf']['label'],
                'nb_w2v': r['nb_w2v']['label'],
                'svm_w2v': r['svm_w2v']['label'],
                'nb_w2v_s': r['nb_w2v_s']['label'],
                'svm_w2v_s': r['svm_w2v_s']['label'],
            })

        return jsonify(results)

    except Exception as e:
        import traceback

        print("=== ERROR BATCH ===")
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            'error': str(e)
        }), 500

@app.route('/api/health')
def health(): return jsonify({'status':'ok','sastrawi':USE_SASTRAWI})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
