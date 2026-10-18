import { PracticeArea } from "./types";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "cheque-bounce-lawyer-delhi",
    title: { value: "Cheque Bounce Matters", verified: true },
    subtitle: { value: "Section 138, Negotiable Instruments Act, 1881", verified: true },
    shortDescription: {
      value: "Legal representation and statutory advisory under Section 138 of the Negotiable Instruments Act before Magistrate and Sessions courts in Delhi.",
      verified: true,
    },
    intro: {
      value: "Proceedings concerning dishonoured cheques are governed primarily by Section 138 of the Negotiable Instruments Act, 1881. The statutory framework provides a quasi-criminal remedy for the payee while maintaining strict statutory timelines for notices and complaints.",
      verified: true,
    },
    legalNote: {
      value: "Under Section 138 of the Negotiable Instruments Act, statutory time frames apply: a legal demand notice must generally be issued within 30 days of receiving the bank memo, providing 15 days for the drawer to pay. If payment is not made within 15 days, a criminal complaint must be filed before the competent Metropolitan Magistrate within 30 days of the cause of action arising. Confirm current law, judicial precedents, and specific time limits with the advocate.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Payees, individuals, and business entities holding dishonoured cheques seeking statutory recovery.",
        "Drawers and defendants served with legal demand notices or court summons under Section 138.",
        "Commercial enterprises seeking compoundable settlement, mediation, or trial defence.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "A cheque presented within its validity period is returned unpaid due to insufficient funds or exceeding arrangements.",
        "The drawer issues stop-payment instructions or closes the account before the cheque is encashed.",
        "The underlying cheque was issued in discharge of a legally enforceable debt or liability.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Bank Return Memo Receipt",
          description: "The cheque is returned unpaid by the drawee bank with an official return memo specifying the reason for dishonour.",
        },
        {
          step: 2,
          title: "Statutory Demand Notice (30 Days)",
          description: "A formal written notice of demand is dispatched to the drawer within 30 days of receiving the bank memo.",
        },
        {
          step: 3,
          title: "Fifteen-Day Settlement Window",
          description: "The drawer is afforded 15 clear days from receipt of the notice to remit the demanded cheque amount.",
        },
        {
          step: 4,
          title: "Complaint Filing (Within 30 Days)",
          description: "If payment is not made within the 15-day period, a formal criminal complaint must be instituted before the competent Metropolitan Magistrate within 30 days.",
        },
        {
          step: 5,
          title: "Cognizance, Summoning & Trial",
          description: "The court examines the complainant under Section 200 CrPC/BNSS, issues process/summons, frames notice of accusation, and conducts summary/regular trial or refers to Lok Adalat/mediation.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "Metropolitan Magistrate Courts (Designated NI Act Courts, Delhi)",
        "District & Sessions Courts (Revisional & Appellate Jurisdiction)",
        "Delhi High Court (Section 482 CrPC / Section 528 BNSS Petitions & Appeals)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is the mandatory timeline to issue a legal notice under Section 138?",
          answer: "The legal demand notice must be dispatched within 30 days of receiving the bank dishonour memo. The drawer must then be granted 15 days to make payment.",
        },
        {
          question: "Can a Section 138 cheque bounce matter be settled through mediation?",
          answer: "Yes. Offences under Section 138 of the Negotiable Instruments Act are compoundable. Courts encourage amicable resolution, Lok Adalat referral, or mutual settlement between the parties at any stage of proceedings.",
        },
        {
          question: "What occurs if the complainant misses the 30-day filing deadline?",
          answer: "Under Section 142(1)(b) of the Act, the court may condone delay in filing the complaint if the complainant satisfies the Magistrate that there was sufficient cause for not filing within the prescribed period.",
        },
        {
          question: "Is interim compensation applicable during trial?",
          answer: "Section 143A of the NI Act empowers the trial court to direct the drawer to pay interim compensation not exceeding 20% of the cheque amount during summary or regular trial.",
        },
        {
          question: "Can directors or partners be prosecuted for company cheques?",
          answer: "Under Section 141 of the Act, if the person committing the offence is a company or partnership, individuals who were in charge of and responsible for the conduct of business at the time of the offence may be vicariously prosecuted, subject to specific averments in the complaint.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "This summary provides general procedural information regarding Section 138 of the Negotiable Instruments Act and does not constitute formal legal advice. Confirm current law, judicial precedents, and specific time limits with the advocate.",
      verified: true,
    },
  },
  {
    slug: "criminal-lawyer-delhi",
    title: { value: "Criminal Law", verified: true },
    subtitle: { value: "Trial, Appellate & Bail Advocacy in Delhi", verified: true },
    shortDescription: {
      value: "Representation in investigation, trial, bail, and appellate proceedings before District Courts, Delhi High Court, and the Supreme Court.",
      verified: true,
    },
    intro: {
      value: "Criminal defence and procedural advocacy demand meticulous scrutiny of investigation records, constitutional safeguards, statutory timelines, and judicial precedents under the substantive penal laws and criminal procedure codes.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Individuals seeking legal counsel during police inquiry or investigation.",
        "Persons applying for Anticipatory Bail, Regular Bail, or Default Bail.",
        "Complainants and victims pursuing criminal complaints or representation.",
        "Appellants and revisionists contesting trial court orders or convictions.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Registration of an FIR or institution of a criminal complaint.",
        "Arrest, detention, or apprehension of arrest requiring bail intervention.",
        "Framing of charges, examination of prosecution witnesses, and trial defense.",
        "Quashing of proceedings or challenging orders before the High Court.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Investigation & Bail Stage",
          description: "Legal evaluation of FIR allegations, custodial rights, and filing of Anticipatory or Regular Bail applications.",
        },
        {
          step: 2,
          title: "Chargesheet Review & Scrutiny",
          description: "Analysis of the police investigation report (Section 173 CrPC / Section 193 BNSS), witness statements, and documentary evidence.",
        },
        {
          step: 3,
          title: "Arguments on Charge",
          description: "Submissions before the court regarding whether prima facie material exists to frame formal charges or warrant discharge.",
        },
        {
          step: 4,
          title: "Trial & Cross-Examination",
          description: "Strategic examination and cross-examination of prosecution and defence witnesses to test veracity and evidentiary value.",
        },
        {
          step: 5,
          title: "Final Arguments & Judicial Verdict",
          description: "Comprehensive statutory and factual oral submissions followed by delivery of judgment.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "District & Sessions Courts (Delhi NCR)",
        "High Court of Delhi (Appellate, Revisional & Writ Jurisdiction)",
        "Supreme Court of India (Special Leave Petitions & Criminal Appeals)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is the difference between Anticipatory Bail and Regular Bail?",
          answer: "Anticipatory Bail is sought before arrest when a person apprehends arrest in a non-bailable offence. Regular Bail is applied for after an individual has already been arrested or surrendered into judicial custody.",
        },
        {
          question: "Can an FIR be quashed by the High Court?",
          answer: "Yes, the High Court possesses inherent powers (Section 482 CrPC / Section 528 BNSS) to quash an FIR or criminal complaint to prevent abuse of the process of law, secure ends of justice, or where parties have settled non-heinous private disputes.",
        },
        {
          question: "What rights does an arrested person possess in India?",
          answer: "Under constitutional and statutory provisions, an arrested person has the right to be informed of the grounds of arrest, the right to consult legal counsel, the right to medical examination, and the right to be produced before a Magistrate within 24 hours.",
        },
        {
          question: "What is Default Bail?",
          answer: "Default Bail (statutory bail under Section 167(2) CrPC / Section 187 BNSS) is an indefeasible right available to an accused if the investigating agency fails to conclude investigation and file a chargesheet within the prescribed statutory period (typically 60 or 90 days depending on the offence).",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "Criminal legal proceedings depend entirely on factual specifics, judicial discretion, and statutory requirements. This overview is informational; Bar Council of India rules strictly prohibit any guarantee of outcome.",
      verified: true,
    },
  },
  {
    slug: "civil-lawyer-delhi",
    title: { value: "Civil Law", verified: true },
    subtitle: { value: "Commercial, Contractual & Property Litigation", verified: true },
    shortDescription: {
      value: "Advocacy in civil suits, commercial disputes, injunctions, and recovery proceedings before District Courts and the Delhi High Court.",
      verified: true,
    },
    intro: {
      value: "Civil jurisprudence involves the enforcement and defence of substantive private rights, property ownership, contractual commitments, and equitable remedies before trial and appellate forums in Delhi.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Commercial organizations and businesses engaged in contractual disputes.",
        "Property owners facing encroachment, title cloud, or tenancy disputes.",
        "Individuals seeking recovery of dues, damages, or declaration of title.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Breach of contract, supply agreements, or commercial covenants.",
        "Suits for permanent and temporary injunction, specific performance, or declaration.",
        "Summary suits for recovery of money under Order XXXVII of the CPC.",
        "Execution proceedings for the enforcement of decrees and arbitral awards.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Pre-Litigation Notice & Mediation",
          description: "Issuance of legal demand notice and mandatory pre-institution mediation for specified commercial disputes.",
        },
        {
          step: 2,
          title: "Plaint Drafting & Presentation",
          description: "Institution of the civil suit accompanied by supporting affidavits, documents, and interim injunction applications.",
        },
        {
          step: 3,
          title: "Summons & Written Statement",
          description: "Service upon the defendant and filing of the defence statement within statutory limitation windows.",
        },
        {
          step: 4,
          title: "Framing of Issues & Evidence",
          description: "The court delineates disputed questions of law and fact; parties lead witness evidence and cross-examination.",
        },
        {
          step: 5,
          title: "Final Hearing, Decree & Execution",
          description: "Adjudication of the dispute culminating in a decree, followed by execution proceedings if required.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "District Courts (Civil & Commercial Benches, Delhi)",
        "Delhi High Court (Original Civil Jurisdiction & Appellate Benches)",
        "Supreme Court of India (Civil Appeals & Special Leave Petitions)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is an interim injunction in civil law?",
          answer: "An interim injunction (under Order XXXIX Rules 1 & 2 CPC) is a temporary judicial order preserving the status quo of a property or restraining a party from taking prejudicial action pending final decision of the suit.",
        },
        {
          question: "Is pre-institution mediation mandatory for commercial suits?",
          answer: "Under Section 12A of the Commercial Courts Act, 2015, pre-institution mediation is mandatory for commercial suits unless the plaintiff seeks urgent interim relief.",
        },
        {
          question: "What is a Summary Suit under Order XXXVII CPC?",
          answer: "A summary suit is an expedited procedure for debt recovery based on bills of exchange, hundis, promissory notes, or written contracts where the defendant must apply for leave to defend.",
        },
        {
          question: "How long does a civil decree remain valid for execution?",
          answer: "Under the Limitation Act, 1963, an application for execution of a civil court decree must generally be instituted within 12 years from the date the decree becomes enforceable.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "This summary outlines general civil procedure in India and does not constitute formal legal counsel. Every civil dispute turns on specific documentation, limitation periods, and jurisdiction.",
      verified: true,
    },
  },
  {
    slug: "matrimonial-lawyer-delhi",
    title: { value: "Matrimonial Law", verified: true },
    subtitle: { value: "Divorce, Alimony & Domestic Legal Advisory", verified: true },
    shortDescription: {
      value: "Legal counsel in mutual consent divorce, contested matrimonial litigation, maintenance claims, and mediation in Delhi.",
      verified: true,
    },
    intro: {
      value: "Matrimonial legal practice encompasses both adversarial proceedings and alternative dispute resolution aimed at fair, dignified, and statutory resolution of marital disputes before Family Courts.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Couples seeking mutual consent divorce with settled terms.",
        "Parties facing contested divorce proceedings on statutory grounds.",
        "Spouses addressing questions of interim maintenance, alimony, and asset division.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Mutual agreement on separation terms, division of assets, and settlement.",
        "Filing or contesting petitions on grounds such as cruelty, desertion, or adultery under applicable personal laws.",
        "Applications for interim maintenance under Section 125 CrPC / BNSS or Section 24 Hindu Marriage Act.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Consultation & Settlement Assessment",
          description: "Confidential review of marital background, financial disclosures, and feasibility of mediated settlement.",
        },
        {
          step: 2,
          title: "Petition Drafting & Filing",
          description: "Preparation of petition with statutory averments, marriage proof, and formal execution before the Family Court.",
        },
        {
          step: 3,
          title: "Court Counselling & Mediation",
          description: "Mandatory referral to the Family Court counsellor or mediation center to explore reconciliation or mutually agreed terms.",
        },
        {
          step: 4,
          title: "First & Second Motion / Trial",
          description: "In mutual consent: recording First Motion statement followed by cooling-off waiver/Second Motion. In contested: pleadings, evidence, and trial.",
        },
        {
          step: 5,
          title: "Final Judgment & Decree",
          description: "Issuance of formal decree of dissolution of marriage or statutory relief.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "Family Courts across Delhi (Tis Hazari, Saket, Dwarka, Rohini, Karkardooma, Patiala House)",
        "Delhi High Court (Appellate Jurisdiction)",
        "Supreme Court of India (Transfer Petitions & SLPs)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is the procedure for Mutual Consent Divorce?",
          answer: "Under Section 13B of the Hindu Marriage Act, both parties jointly file a petition (First Motion) stating they have lived separately for at least one year. After a statutory period (or waiver), the Second Motion is recorded, leading to the dissolution decree.",
        },
        {
          question: "Can the six-month statutory cooling-off period be waived?",
          answer: "Yes, the Supreme Court of India in Amardeep Singh v. Harveen Kaur held that the six-month period under Section 13B(2) is directory, not mandatory, and Family Courts can waive it where all settlement terms are concluded.",
        },
        {
          question: "How is interim maintenance calculated?",
          answer: "Under the guidelines established in Rajnesh v. Neha by the Supreme Court, both parties must file comprehensive Affidavits of Assets and Liabilities. The court assesses status, income, financial needs, and commitments to fix a balanced amount.",
        },
        {
          question: "What is the difference between Judicial Separation and Divorce?",
          answer: "Judicial separation releases spouses from the obligation to cohabit while keeping the legal status of marriage intact. Divorce permanently dissolves the marriage, allowing parties to remarry.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "Matrimonial matters in India prioritize mediation and amicable resolution where possible. This overview is purely educational and does not constitute formal legal counsel.",
      verified: true,
    },
  },
  {
    slug: "family-lawyer-delhi",
    title: { value: "Family Matters", verified: true },
    subtitle: { value: "Succession, Estate Partition & Guardianship", verified: true },
    shortDescription: {
      value: "Advisory and representation in inheritance, partition of ancestral property, wills, probate, and child custody matters.",
      verified: true,
    },
    intro: {
      value: "Family law encompasses the preservation of family harmony, orderly inheritance, succession certification, partition of shared estates, and child custody adjudication under personal and statutory laws.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Legal heirs managing intestate succession or estate division.",
        "Testators and beneficiaries seeking probate or letters of administration for wills.",
        "Co-owners and coparceners seeking equitable partition of joint properties.",
        "Parents addressing child guardianship, visitation rights, and welfare.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Deceased family member leaving estate without a will (intestate succession).",
        "Disputes among siblings or legal heirs regarding ancestral or joint family assets.",
        "Petitions under Guardians and Wards Act for child custody and welfare.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Title & Pedigree Verification",
          description: "Examination of property records, genealogical pedigree trees, succession certificates, or registered wills.",
        },
        {
          step: 2,
          title: "Mediation or Legal Notice",
          description: "Initiating amicable settlement discussions among family co-sharers or dispatching legal notice for partition.",
        },
        {
          step: 3,
          title: "Petition / Suit Filing",
          description: "Institution of Suit for Partition or petition for Probate/Guardianship before the competent court.",
        },
        {
          step: 4,
          title: "Citation & Evidence",
          description: "Publication of general citation in probate/succession, appointment of Local Commissioner for partition assessment.",
        },
        {
          step: 5,
          title: "Final Partition / Grant of Certificate",
          description: "Delivery of preliminary and final decree or grant of probate / succession certificate.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "Family Courts (Custody & Guardianship Benches)",
        "District Courts (Civil & Probate Benches, Delhi)",
        "Delhi High Court (Original & Appellate Jurisdiction)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is a Succession Certificate?",
          answer: "A Succession Certificate is granted by a civil court under the Indian Succession Act, 1925, certifying legal heirs entitled to realize debts and securities of a deceased person who died intestate.",
        },
        {
          question: "Is probate of a will mandatory in Delhi?",
          answer: "Unlike statutory rules applicable in presidency towns, probate of a will executed in Delhi is generally not mandatory under Section 57 read with Section 213 of the Indian Succession Act, though it remains advisable for establishing clean title.",
        },
        {
          question: "How is child custody decided by Indian courts?",
          answer: "The paramount consideration in any child custody proceeding under the Guardians and Wards Act, 1890 is the best interest and welfare of the child, overriding parental property-like claims.",
        },
        {
          question: "Can a daughter claim share in ancestral property?",
          answer: "Yes. Following the 2005 amendment to the Hindu Succession Act, 1956 and the Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma, daughters are coparceners by birth with equal rights in joint family property.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "Family inheritance, partition, and guardianship laws involve detailed personal law codes. This overview is informational only; confirm specific facts with the advocate.",
      verified: true,
    },
  },
  {
    slug: "trademark-lawyer-delhi",
    title: { value: "Trademark Law", verified: true },
    subtitle: { value: "Brand Protection, Oppositions & IP Litigation", verified: true },
    shortDescription: {
      value: "Counsel on trademark registration, examination replies, opposition proceedings, and IP enforcement before the Trade Marks Registry and Commercial Courts.",
      verified: true,
    },
    intro: {
      value: "Trademark law secures commercial identity, brand equity, and proprietary reputation against unauthorized adoption, dilution, or infringement under the Trade Marks Act, 1999.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Enterprises, startups, and brand owners seeking to protect novel trademarks and logos.",
        "Businesses opposing conflicting trademark applications published in the Trademark Journal.",
        "Proprietors defending against trademark objections or infringement notices.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Pre-adoption trademark clearance searches across relevant Nice classifications.",
        "Objections raised under Sections 9 (absolute grounds) or 11 (relative grounds) in examination reports.",
        "Filing Notice of Opposition or Counter-Statement within 4 months of publication.",
        "Commercial suits for injunction and damages against passing off or trademark infringement.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Comprehensive Search & Clearance",
          description: "Search of the Trade Marks Registry database to evaluate distinctiveness and identify conflicting prior marks.",
        },
        {
          step: 2,
          title: "Application Filing",
          description: "Filing of form TM-A with user affidavit, power of attorney, and specimen evidence of commercial use.",
        },
        {
          step: 3,
          title: "Examination & Reply",
          description: "Drafting of formal response to examination report and appearance in show-cause hearings before the Registrar.",
        },
        {
          step: 4,
          title: "Publication & Opposition",
          description: "Four-month advertisement in the Trademark Journal; managing opposition pleadings and evidence under Rules 45–47.",
        },
        {
          step: 5,
          title: "Registration & Renewal",
          description: "Issuance of registration certificate valid for 10 years, followed by decennial renewals.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "Trade Marks Registry (Boudhik Sampada Bhawan, Dwarka, Delhi)",
        "District Commercial Courts (Designated IP Benches, Delhi)",
        "Delhi High Court (Intellectual Property Division - IPD)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "How long does trademark registration take in India?",
          answer: "If an application encounters no objections or third-party oppositions, registration may be completed within 6 to 12 months. Contested proceedings may take longer depending on hearings.",
        },
        {
          question: "What is the difference between ™ and ® symbols?",
          answer: "The ™ symbol denotes an unregistered mark for which protection is claimed or an application is pending. The ® symbol may legally only be used once the trademark registration certificate has been formally issued.",
        },
        {
          question: "What is the time limit to oppose a published trademark?",
          answer: "Under Section 21 of the Trade Marks Act, a Notice of Opposition must be filed within four months from the date the application was advertised or re-advertised in the Trademark Journal.",
        },
        {
          question: "What is the difference between infringement and passing off?",
          answer: "Infringement is a statutory remedy available exclusively for registered trademarks under the Trade Marks Act, 1999. Passing off is a common law tort protecting unregistered brand goodwill and reputation against deceptive misrepresentation.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "Trademark procedures and IP enforcement require specialized examination responses and jurisdictional filings. This summary is strictly informational.",
      verified: true,
    },
  },
  {
    slug: "ncmei-matters-lawyer-delhi",
    title: { value: "NCMEI-related Matters", verified: true },
    subtitle: { value: "National Commission for Minority Educational Institutions Act, 2004", verified: true },
    shortDescription: {
      value: "Legal representation and statutory advisory regarding proceedings before the National Commission for Minority Educational Institutions (NCMEI) and related appellate courts.",
      verified: true,
    },
    intro: {
      value: "The National Commission for Minority Educational Institutions Act, 2004 provides a specialized statutory forum for determining minority status, addressing affiliation grievances, and resolving regulatory matters concerning educational institutions established by religious and linguistic minorities.",
      verified: true,
    },
    legalNote: {
      value: "NCMEI proceedings operate under the powers of a civil court as delineated in Section 12 of the NCMEI Act, 2004. Submissions must adhere to prescribed documentary and evidentiary requirements, with determinations subject to writ review before the High Court of Delhi and appellate oversight by the Supreme Court of India.",
      verified: true,
    },
    whoItHelps: {
      value: [
        "Trusts, societies, and foundations administering or establishing minority educational institutions.",
        "School and college management bodies addressing affiliation or no-objection certificate (NOC) requirements.",
        "Educational stakeholders requiring statutory representations or administrative dispute counsel.",
      ],
      verified: true,
    },
    whenItApplies: {
      value: [
        "Applications for grant or certification of minority educational status under Section 11 of the Act.",
        "Statutory appeals or disputes concerning the issuance of NOC by competent state authorities.",
        "Grievances regarding institutional autonomy and protections anchored under Article 30(1) of the Constitution.",
      ],
      verified: true,
    },
    processSteps: {
      value: [
        {
          step: 1,
          title: "Founding Document & Charter Review",
          description: "Examination of trust deeds, society registration certificates, memoranda of association, and institutional bylaws.",
        },
        {
          step: 2,
          title: "Statutory Petition & Affidavit Drafting",
          description: "Preparation of formal petitions, supporting affidavits, and verification records strictly in accordance with commission regulations.",
        },
        {
          step: 3,
          title: "Registry Filing & Service of Notices",
          description: "Institution of proceedings before the NCMEI registry in New Delhi, followed by formal service upon competent state authorities.",
        },
        {
          step: 4,
          title: "Hearings & Statutory Representation",
          description: "Substantive representation before the commission bench, addressing administrative observations and presenting documentary evidence.",
        },
        {
          step: 5,
          title: "Order Compliance & Judicial Review",
          description: "Advising on compliance with final certification or instituting writ review proceedings before the High Court of Delhi where appropriate.",
        },
      ],
      verified: true,
    },
    relevantForums: {
      value: [
        "National Commission for Minority Educational Institutions (NCMEI, New Delhi)",
        "Delhi High Court (Writ & Appellate Jurisdiction)",
        "Supreme Court of India (Appellate Jurisdiction)",
      ],
      verified: true,
    },
    faqs: {
      value: [
        {
          question: "What is the primary role of the NCMEI?",
          answer: "The National Commission for Minority Educational Institutions is a statutory quasi-judicial body constituted under the NCMEI Act, 2004 to advise governments, adjudicate disputes on minority status, and ensure educational rights under the Constitution.",
        },
        {
          question: "Can an order of the NCMEI be challenged in court?",
          answer: "Yes. Determinations and final orders of the Commission are amenable to the supervisory and writ jurisdiction of the High Court of Delhi under Articles 226/227 of the Constitution of India, and subsequently before the Supreme Court of India.",
        },
        {
          question: "Does the Commission entertain matters from states outside Delhi?",
          answer: "Yes. The NCMEI exercises jurisdiction across India, hearing petitions and disputes concerning minority educational institutions established across various states and union territories.",
        },
        {
          question: "What is the importance of an NOC in institutional recognition?",
          answer: "Under Section 10 of the NCMEI Act, if a state authority does not decide on an application for a No Objection Certificate within the prescribed statutory period, the applicant may approach the Commission directly for necessary directions.",
        },
      ],
      verified: true,
    },
    disclaimer: {
      value: "Information concerning NCMEI proceedings is strictly informational, observing Bar Council of India guidelines. Consult directly with the advocate for individual institutional advisory.",
      verified: true,
    },
  },
];
