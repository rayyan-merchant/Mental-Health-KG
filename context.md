
---

# 📄 **context.md — Mental Health Ontology Knowledge Graph Project**

## **1. Project Title**

# **Mental Health Ontology & Knowledge Graph for Reasoning-Based Emotional Wellness Support**

---

## **2. Project Overview**

University students increasingly face mental-health challenges such as stress, anxiety, burnout, social withdrawal, and depressive symptoms. Research continues to highlight the need for **intelligent, explainable systems** capable of understanding emotions, symptoms, and behavioral patterns (Nature, 2025; Arxiv 1912.05530).

This project develops a **Mental Health Knowledge Graph (KG)** combined with an **explainable reasoning system**.
It uses:

* **OWL** to model mental health concepts
* **RDF** to represent emotional/symptom relationships
* **SPARQL** for querying and rule-based inference
* **NLP** for real-time extraction of emotions/symptoms from user messages
* **Ontology-driven reasoning** to infer mental states
* **Explainable AI (XAI)** to justify conclusions

The final output is an **emotion-aware, ontology-powered conversational assistant** that:

* Extracts symptoms & emotions from messages
* Maps them to ontology concepts
* Infers emotional or mental-health states
* Provides **causal explanations** (WHY it inferred something)
* Suggests safe, non-clinical interventions

The system runs **locally** (no deployment required).

---

# **3. Project Motivation**

Students commonly display symptoms like:

* insomnia
* academic pressure
* self-doubt
* stress eating
* panic
* social anxiety
* irritability
* hopelessness

Many of these patterns are early indicators of deeper mental-health conditions.
A **Knowledge Graph + Reasoning Engine** enables:

* Structured representation of mental states
* Dependencies between symptoms, emotions, and disorders
* Transparent causal inference
* Early assistance using explainable logic

This aligns directly with **Knowledge Representation & Reasoning (KRR)** course goals.

---

# **4. Project Goals**

### ✔ Build a formal **Mental Health Ontology**

### ✔ Create a **Knowledge Graph of emotions, symptoms, triggers, disorders, and interventions**

### ✔ Build a **NLP pipeline** to extract concepts from natural text

### ✔ Implement **reasoning rules** using SPARQL + OWL

### ✔ Build a **continuous conversational agent** that uses:

* ontology mapping
* semantic reasoning
* causal explanation generation

### ✔ Provide safe, non-medical guidance

### ❌ No clinical diagnosis

### ❌ No therapy or medical advice

(Only educational and well-being support.)

---

# **5. Technologies & Tools**

You already know most of these — only the necessary ones are listed.

### **Ontology & KG**

* OWL
* RDF / Turtle
* Protégé
* SPARQL

### **Backend**

* Python
* Flask or FastAPI (simple API for local conversational interface)
* RDFLib (Python library for parsing/querying RDF)
* Owlready2 (optional: for reasoning & ontology manipulation)

### **NLP**

* NLTK (tokenization, stemming, basic preprocessing)
* scikit-learn (keyword extraction, simple classifiers)
* sentence-transformers (semantic similarity for concept matching)

### **Frontend (Optional but recommended)**

* Simple HTML/CSS/JS chat interface
* Or Streamlit app for a clean UI

---

# **6. Dataset Sources (Optional for Enhancement)**

These datasets help validate your NLP extraction module:

1. **MHP Anxiety–Stress–Depression Dataset (Figshare)**
2. **Kaggle: Sentiment Analysis for Mental Health**
3. **PubMed/PMC: Mental Health Research Datasets**

You *don’t have to train big models*, but small text samples help create keyword lists and patterns.

---

# **7. System Workflow Overview**

```
User Message
      ↓
NLP Module
- extract emotions
- extract symptoms
- extract triggers
- semantic similarity to ontology terms
      ↓
Concept Mapping to Ontology
      ↓
Insert extracted triples into session knowledge graph
      ↓
Run SPARQL/OWL reasoning rules
      ↓
Infer mental state / risk pattern
      ↓
Causal Explanation Generator
      ↓
Chatbot Response with reasoning + advice
```

---

# **8. Ontology Structure (High-Level Design)**

Your ontology will include:

### **Core Classes**

* **Emotion**
* **Symptom**
* **Trigger**
* **MentalState**
* **RiskLevel**
* **Intervention**
* **BehaviorPattern**

### **Subclass Examples**

#### Emotion

* Stress
* Anxiety
* Sadness
* Fear
* Irritability
* Hopelessness

#### Symptom

* Insomnia
* Fatigue
* BreathDifficulty
* RapidHeartRate
* Shakiness
* SocialWithdrawal

#### Trigger

* ExamPressure
* AcademicWorkload
* SocialExposure
* PresentationFear
* RelationshipIssues

#### MentalState

* AcademicStress
* PanicRisk
* EarlyDepression
* Burnout
* SocialAnxiety

#### Intervention

* BreathingExercise
* TimeManagement
* Journaling
* GroundingTechnique
* TalkToCounselor

---

# **9. Knowledge Graph Design**

Triples will represent:

```
:User :hasSymptom :Insomnia
:User :experiencesEmotion :Stress
:User :facingTrigger :ExamPressure
:Insomnia :associatedWith :Anxiety
:AcademicStress :canLeadTo :Anxiety
:Anxiety :recommendedIntervention :BreathingExercise
```

Each user session has its **own temporary subgraph**.

---

# **10. Reasoning Rules (SPARQL)**

### Example Rule 1 — Academic Stress → Anxiety Risk

```
IF 
  User hasEmotion Stress
  AND User hasSymptom Insomnia
  AND User hasTrigger ExamPressure
THEN 
  User inferredState AnxietyRisk
```

### Example Rule 2 — Fatigue + Social Withdrawal → Depressive Pattern

```
fatigue + withdrawal → depressive_spectrum
```

### Example Rule 3 — Panic Symptoms → Panic Attack Risk

```
rapid heartbeat + breath difficulty + panic → panic_risk
```

### Example Rule 4 — Overwork + Exhaustion → Burnout

```
overwork + stress + exhaustion → burnout_risk
```

These rules will be implemented using SPARQL INSERT queries.

---

# **11. Conversational Agent Design**

### **Why continuous chat?**

It allows the system to accumulate emotional evidence across multiple messages.

#### Example:

1. “I can’t sleep.” → Insomnia
2. “Exams are stressing me.” → AcademicStress
3. “I feel pressure from my parents.” → FamilyPressure

→ System infers *High Anxiety Risk*.

### Chatbot responses include:

* extracted concepts
* inferred state
* causal explanation
* safe advice

---

# **12. Example Chat Flow (Simplified)**

**User:** “I can’t sleep because of exams.”
→ Extract: Insomnia, ExamPressure, Stress
→ Infer: AnxietyRisk
→ Explain: Sleep + stress + pressure = anxiety pattern

**Bot:**
“It looks like academic pressure is affecting your sleep.
This combination often creates anxiety. Let’s try a calming routine…”

---

# **13. Ethical and Safety Boundaries**

This system is **NOT**:

* a medical diagnosis tool
* a therapy system
* a replacement for counselors

The chatbot will:

* give general well-being advice
* encourage self-care
* suggest contacting a professional if symptoms are severe

---

# **14. Final Deliverables**

### **1. Ontology Files**

* mental_health.owl
* mental_health.ttl

### **2. Knowledge Graph**

* base graph
* session graphs

### **3. Reasoning Rules**

* SPARQL rules file

### **4. NLP Pipeline**

* emotion & symptom extractor
* semantic similarity matcher

### **5. Backend**

* Flask/FastAPI service
* endpoints for processing messages

### **6. Chat UI (Optional)**

* simple web-based chat

### **7. Case Study**

* 10 reasoning-based dialogues
* screenshots
* explanation of inference

### **8. Final Report**

* architecture
* ontology explanation
* reasoning demonstration

---


# **17. Scope Summary**

✔ Build ontology
✔ Build KG
✔ Implement reasoning
✔ Implement NLP extractor
✔ Build conversational interface
✔ Provide explainable (causal) responses

❌ No deep learning model training
❌ No deployment
❌ No authentication
❌ No medical decisions

