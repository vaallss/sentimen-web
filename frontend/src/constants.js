export const SCENARIOS = [
  { id:'nb_tf',     label:'NB + TF-IDF',        model:'NB',  feat:'TF-IDF',  smote:false, acc:0.90, pn:.89,rn:.93,fn:.91,pp:.92,rp:.87,fp:.90,mf:.90, cm:[[525,39],[67,449]] },
  { id:'svm_tf',    label:'SVM + TF-IDF',        model:'SVM', feat:'TF-IDF',  smote:false, acc:0.93, pn:.91,rn:.95,fn:.93,pp:.94,rp:.90,fp:.92,mf:.92, cm:[[536,28],[52,464]] },
  { id:'nb_tf_s',   label:'NB + TF-IDF + SMOTE', model:'NB',  feat:'TF-IDF',  smote:true,  acc:0.91, pn:.90,rn:.92,fn:.91,pp:.91,rp:.89,fp:.90,mf:.91, cm:[[519,45],[57,459]] },
  { id:'svm_tf_s',  label:'SVM + TF-IDF + SMOTE',model:'SVM', feat:'TF-IDF',  smote:true,  acc:0.92, pn:.91,rn:.94,fn:.93,pp:.94,rp:.90,fp:.92,mf:.92, cm:[[530,34],[52,464]] },
  { id:'nb_w2v',    label:'NB + W2V',             model:'NB',  feat:'Word2Vec', smote:false, acc:0.71, pn:.68,rn:.85,fn:.76,pp:.78,rp:.56,fp:.65,mf:.70, cm:[[480,84],[227,289]] },
  { id:'svm_w2v',   label:'SVM + W2V',            model:'SVM', feat:'Word2Vec', smote:false, acc:0.76, pn:.71,rn:.90,fn:.79,pp:.84,rp:.61,fp:.71,mf:.75, cm:[[508,56],[201,315]] },
  { id:'nb_w2v_s',  label:'NB + W2V + SMOTE',     model:'NB',  feat:'Word2Vec', smote:true,  acc:0.71, pn:.68,rn:.84,fn:.75,pp:.77,rp:.57,fp:.65,mf:.70, cm:[[474,90],[222,294]] },
  { id:'svm_w2v_s', label:'SVM + W2V + SMOTE',    model:'SVM', feat:'Word2Vec', smote:true,  acc:0.76, pn:.72,rn:.88,fn:.79,pp:.83,rp:.63,fp:.72,mf:.76, cm:[[496,68],[191,325]] },
]

export const MODEL_KEYS = ['nb_tf','svm_tf','nb_w2v','svm_w2v','nb_w2v_s','svm_w2v_s']

export const MODEL_INFO = {
  nb_tf:    { label:'NB + TF-IDF',        feat:'TF-IDF',   smote:false, acc:'90%', best:false },
  svm_tf:   { label:'SVM + TF-IDF',       feat:'TF-IDF',   smote:false, acc:'93%', best:true  },
  nb_w2v:   { label:'NB + W2V',           feat:'Word2Vec', smote:false, acc:'71%', best:false },
  svm_w2v:  { label:'SVM + W2V',          feat:'Word2Vec', smote:false, acc:'76%', best:false },
  nb_w2v_s: { label:'NB + W2V + SMOTE',   feat:'Word2Vec', smote:true,  acc:'71%', best:false },
  svm_w2v_s:{ label:'SVM + W2V + SMOTE',  feat:'Word2Vec', smote:true,  acc:'76%', best:false },
}

export const CHART_COLORS = {
  primary: '#4f46e5',
  green:   '#16a34a',
  red:     '#dc2626',
  amber:   '#d97706',
  blue:    '#2563eb',
  purple:  '#7c3aed',
}
