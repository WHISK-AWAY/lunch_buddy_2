const messages = [
  { message: 'Oth extrartic fx low end r rad, 7thJ', isRead: true },
  {
    message: 'Activity, rowing, canoeing, kayaking, rafting and tubing',
    isRead: true,
  },
  {
    message: 'Underdosing of ganglionic blocking drugs, subs encntr',
    isRead: false,
  },
  {
    message: 'Arthritis due to other bacteria, unspecified shoulder',
    isRead: false,
  },
  {
    message: 'Asphyxiation due to plastic bag, accidental, subs encntr',
    isRead: false,
  },
  {
    message: 'Burn 3rd deg mu sites of left shldr/up lmb, ex wrs/hnd, subs',
    isRead: true,
  },
  {
    message: 'Prosth/oth implnt, matrl & hosp/persnl-use dev assoc w incdt',
    isRead: true,
  },
  {
    message: 'Crushing injury of right ring finger, subsequent encounter',
    isRead: false,
  },
  {
    message: 'Complete traumatic amputation of one right lesser toe',
    isRead: true,
  },
  {
    message: 'Hodgkin lymphoma, unsp, lymph nodes of head, face, and neck',
    isRead: false,
  },
  {
    message: 'Oth behav/emotn disord w onset usly occur in chldhd and adol',
    isRead: false,
  },
  { message: 'Pressure ulcer of head, stage 3', isRead: true },
  {
    message: 'Toxic effect of contact w oth jellyfish, undetermined, init',
    isRead: true,
  },
  { message: 'Urge incontinence', isRead: true },
  {
    message: 'Small cell B-cell lymphoma, intrapelvic lymph nodes',
    isRead: true,
  },
  {
    message: 'Cont preg aft spon abort of one fts or more, unsp tri, fts1',
    isRead: true,
  },
  {
    message: 'Oth soft tissue disord related to use/pressure, unsp thigh',
    isRead: false,
  },
  {
    message: 'Unspecified open wound, left foot, subsequent encounter',
    isRead: false,
  },
  { message: 'Other fracture of lesser toe(s)', isRead: true },
  {
    message: 'Matern care for disproprtn d/t unusually large fetus, fts1',
    isRead: true,
  },
  {
    message: 'Disp fx of shaft of oth metacarpal bone, init for opn fx',
    isRead: false,
  },
  {
    message: 'Inj extn musc/fasc/tend at forearm level, unsp arm, sequela',
    isRead: true,
  },
  {
    message: 'Poisoning by enzymes, accidental (unintentional), subs',
    isRead: true,
  },
  {
    message: 'Disp fx of coronoid pro of l ulna, init for opn fx type I/2',
    isRead: false,
  },
  { message: 'Unsp nondisp fx of surg nk of unsp humer, 7thP', isRead: true },
  { message: 'External constriction, right great toe, sequela', isRead: false },
  {
    message: 'Displaced oblique fracture of shaft of right fibula, init',
    isRead: true,
  },
  {
    message: 'Superficial frostbite of neck, initial encounter',
    isRead: false,
  },
  {
    message: 'Oth psychoactive substance use, unsp w withdrawal delirium',
    isRead: false,
  },
  {
    message: 'Personal history of malignant neoplasm of renal pelvis',
    isRead: true,
  },
  {
    message: 'Oth fracture of second lum vertebra, subs for fx w nonunion',
    isRead: false,
  },
  { message: 'Lead-induced chronic gout, unspecified hand', isRead: false },
  { message: 'Malignant neoplasm of temporal lobe', isRead: true },
  {
    message: 'Inj lesser saphenous vein at lower leg level, right leg',
    isRead: false,
  },
  {
    message: 'External constriction, right lesser toe(s), subs encntr',
    isRead: true,
  },
  { message: 'Other venous complications in pregnancy', isRead: false },
  {
    message: 'Anterior spinal artery comprsn syndromes, cervical region',
    isRead: false,
  },
  { message: 'Displ commnt fx shaft of rad, unsp arm, 7thM', isRead: true },
  { message: 'Other perforations of tympanic membrane', isRead: true },
  { message: 'Underdosing of drug/meds/biol subst, init', isRead: false },
  { message: 'Unspecified ptosis of unspecified eyelid', isRead: false },
  { message: 'Herpesviral hepatitis', isRead: false },
  { message: 'Poisoning by antiasthmatics, accidental, subs', isRead: false },
  {
    message: 'Unsp superficial injury of unspecified hand, subs encntr',
    isRead: true,
  },
  { message: 'Fatigue fracture of vertebra', isRead: false },
  { message: 'Congenital complete absence of lower limb', isRead: false },
  { message: 'Other reactive arthropathies, left hand', isRead: false },
  {
    message: 'Rheumatoid vasculitis with rheumatoid arthritis of knee',
    isRead: false,
  },
  { message: 'Fracture of orbital floor, left side, 7thD', isRead: true },
  {
    message: 'Milt op involving explosion of guided missile, milt, sequela',
    isRead: true,
  },
  { message: 'Burn of second degree of left foot', isRead: true },
  { message: 'Parainfluenza virus pneumonia', isRead: true },
  { message: 'Secondary malignant neoplasm of left lung', isRead: true },
  { message: 'Oth incomplete lesion at T1, subs', isRead: false },
  { message: 'Aneurysm of carotid artery', isRead: true },
  {
    message: 'Nondisp fx of prox third of navic bone of unsp wrist, sqla',
    isRead: true,
  },
  {
    message: 'Injury of median nerve at forearm level, unspecified arm',
    isRead: false,
  },
  { message: 'Pigmentary glaucoma, unspecified eye', isRead: true },
  { message: 'External constriction of thigh', isRead: true },
  {
    message: 'Car pasngr injured in nonclsn trnsp accident in traf, subs',
    isRead: false,
  },
  { message: 'Osteochondropathy, unspecified', isRead: true },
  {
    message: 'Dislocation of unsp parts of left shoulder girdle, init',
    isRead: false,
  },
  { message: 'Sequelae of rickets', isRead: false },
  {
    message: 'Infect/inflm reaction due to internal joint prosthesis',
    isRead: true,
  },
  {
    message: 'Unsp tear of unsp meniscus, current injury, left knee, init',
    isRead: true,
  },
  { message: 'Unspecified open wound of vocal cord, sequela', isRead: true },
  { message: 'Displ transverse fx shaft of r rad, 7thG', isRead: true },
  {
    message: 'Primary blast injury of right ear, subsequent encounter',
    isRead: true,
  },
  {
    message: 'Dislocation of carpometacarpal joint of unsp hand, sequela',
    isRead: true,
  },
  {
    message: 'Glider (nonpowered) explosion injuring occupant, init encntr',
    isRead: true,
  },
  {
    message: 'Displaced associated transv/post fracture of left acetabulum',
    isRead: false,
  },
  {
    message: 'Fx unsp carpal bone, left wrist, subs for fx w delay heal',
    isRead: false,
  },
  {
    message: 'Occup of 3-whl mv inj in clsn w ped/anml nontraf, sequela',
    isRead: true,
  },
  {
    message: 'Path fracture, right finger(s), subs for fx w malunion',
    isRead: false,
  },
  {
    message: 'Inj flexor musc/fasc/tend r rng fngr at wrs/hnd lv, init',
    isRead: true,
  },
  {
    message: 'Animl-ridr or occ of anml-drn veh inj in collisn with same',
    isRead: false,
  },
  {
    message: 'Injury of median nerve at upper arm level, unspecified arm',
    isRead: true,
  },
  { message: 'Stress fracture, unspecified shoulder', isRead: true },
  {
    message: 'Pedl cyc passenger injured in clsn w statnry object in traf',
    isRead: false,
  },
  {
    message: 'Burn of unspecified body region, unspecified degree',
    isRead: true,
  },
  { message: 'Loose body in right hip', isRead: true },
  { message: 'Open bite, unspecified knee', isRead: false },
  {
    message: 'Unsp Zone III fracture of sacrum, subs for fx w nonunion',
    isRead: true,
  },
  { message: 'Displ bicondylar fx r tibia, 7thQ', isRead: true },
  {
    message: 'Poisoning by other laxatives, accidental (unintentional)',
    isRead: true,
  },
  { message: 'Drug-induced gout, left shoulder', isRead: true },
  {
    message: 'Nondisp commnt suprcndl fracture w/o intrcndl fx r humerus',
    isRead: true,
  },
  {
    message: 'Atherosclerosis of CABG, unsp, w unsp angina pectoris',
    isRead: true,
  },
  {
    message: "Colles' fx left rad, subs for opn fx type I/2 w delay heal",
    isRead: false,
  },
  {
    message: 'Unsp fracture of right femur, subs for clos fx w delay heal',
    isRead: true,
  },
  { message: 'Unspecified interstitial keratitis, left eye', isRead: false },
  { message: 'Chronic perichondritis of right external ear', isRead: true },
  {
    message: 'Unsp traum nondisp spondylolysis of 4th cervcal vert, 7thG',
    isRead: false,
  },
  {
    message: 'Prsn brd/alit hv veh injured in collision w ped/anml, init',
    isRead: true,
  },
  { message: 'Toxic effect of organic solvents', isRead: false },
  { message: 'Sprain of jaw, bilateral', isRead: true },
  { message: 'Tonic pupil', isRead: true },
  {
    message: 'Multiple fx of pelvis w stable disrupt of pelvic ring, init',
    isRead: false,
  },
  { message: 'Stress fracture, unspecified femur, sequela', isRead: true },
  {
    message: 'Rheumatoid myopathy with rheumatoid arthritis of elbow',
    isRead: false,
  },
  { message: 'Unspecified injury of head of pancreas, sequela', isRead: false },
  {
    message: 'Leakage of cystostomy catheter, subsequent encounter',
    isRead: false,
  },
  { message: 'Underachievement in school', isRead: true },
  {
    message: 'Intracranial hypotension following ventricular shunting',
    isRead: true,
  },
  { message: 'Other specified disorders of bone', isRead: true },
  {
    message: 'Adverse effect of other anti-common-cold drugs, subs encntr',
    isRead: false,
  },
  {
    message: 'Dislocation of unsp interphaln joint of l rng fngr, subs',
    isRead: true,
  },
  {
    message: 'Oth fracture of shaft of radius, left arm, init for clos fx',
    isRead: true,
  },
  { message: 'Acquired absence of left upper limb below elbow', isRead: false },
  { message: 'Displ commnt fx shaft of unsp tibia, 7thH', isRead: false },
  {
    message: 'Oth fx upr & low end r fibula, subs for clos fx w routn heal',
    isRead: false,
  },
  {
    message: 'Strike/struck by unsp automobile airbag, sequela',
    isRead: false,
  },
  { message: 'Other disturbances of skin sensation', isRead: false },
  {
    message: 'Unspecified superficial injury of right hip, subs encntr',
    isRead: true,
  },
  { message: 'Nondisp spiral fx shaft of l fibula, 7thP', isRead: true },
  { message: 'Nondisp artic fx head of l femr, 7thF', isRead: true },
  { message: 'Burn of third degree of left lower leg', isRead: false },
  {
    message: 'Unspecified disorder of right middle ear and mastoid',
    isRead: false,
  },
  {
    message: 'Poisoning by oth psychotropic drugs, undetermined, subs',
    isRead: true,
  },
  { message: 'Conjunctival cysts, left eye', isRead: false },
  {
    message: 'Pnctr w/o foreign body of pharynx and cervical esophagus',
    isRead: true,
  },
  {
    message: 'Toxic effect of venom of gila monster, undetermined, init',
    isRead: false,
  },
  {
    message: 'Pnctr w fb of low back and pelv w/o penet retroperiton, init',
    isRead: true,
  },
  {
    message: 'Burns of other specified parts of left eye and adnexa',
    isRead: false,
  },
  { message: 'Staphylococcal arthritis, left shoulder', isRead: true },
  {
    message: 'Nondisp simple suprcndl fx w/o intrcndl fx unsp humer, sqla',
    isRead: false,
  },
  { message: 'Idiopathic gout, unspecified site', isRead: false },
  { message: 'Amyloid pterygium of eye, bilateral', isRead: true },
  { message: 'Other pervasive developmental disorders', isRead: true },
  {
    message: 'Sprain of interphalangeal joint of right middle finger, subs',
    isRead: false,
  },
  {
    message: 'Lac w/o fb of abd wall, unsp q w/o penet perit cav, subs',
    isRead: true,
  },
  { message: 'Gonococcal meningitis', isRead: false },
  { message: 'Nondisp commnt fx shaft of ulna, unsp arm, 7thM', isRead: false },
  { message: 'Family history of malignant neoplasm of ovary', isRead: false },
  {
    message: 'Oth superficial bite of unsp back wall of thorax, subs',
    isRead: true,
  },
  {
    message: 'Nondisp fx of medial condyle of left humerus, init',
    isRead: true,
  },
  {
    message: 'Nondisp suprcndl fx w/o intrcndl extn low end unsp femr,7thG',
    isRead: true,
  },
  {
    message: 'Penetrating wound without foreign body of left eyeball',
    isRead: false,
  },
  { message: 'Sister, perpetrator of maltreatment and neglect', isRead: false },
  {
    message: 'Nondisp unsp fx unsp lesser toe(s), subs for fx w malunion',
    isRead: true,
  },
  {
    message: 'Dislocation of carpometacarpal joint of left thumb',
    isRead: true,
  },
  {
    message: 'Oth injury of deep palmar arch of right hand, sequela',
    isRead: false,
  },
  {
    message: 'Mech compl of urinary electronic stimulator device',
    isRead: false,
  },
  { message: 'Causalgia of right lower limb', isRead: false },
  { message: 'Disorder of cartilage, unspecified', isRead: false },
  {
    message: 'Dislocation of oth prt lumbar spine and pelvis, subs encntr',
    isRead: true,
  },
  { message: 'Other injury of inferior mesenteric artery', isRead: false },
  {
    message: 'Nondisp fx of medial phalanx of right ring finger, init',
    isRead: false,
  },
  { message: 'Displ transverse fx shaft of unsp fibula, 7thQ', isRead: true },
  {
    message: 'Unspecified subluxation of right toe(s), initial encounter',
    isRead: true,
  },
  { message: 'Contusion of unspecified shoulder, sequela', isRead: true },
  {
    message: 'Corrosion of unspecified degree of lower back, init encntr',
    isRead: true,
  },
  {
    message: 'Subluxation of metacarpophalangeal joint of unsp thumb',
    isRead: false,
  },
  { message: 'Unspecified injury of thoracic aorta, sequela', isRead: false },
  {
    message: 'Epidur hemor w LOC w death due to oth causes bf consc, init',
    isRead: true,
  },
  { message: 'Burn due to fishing boat on fire', isRead: false },
  {
    message: 'Poisoning by benzodiazepines, assault, initial encounter',
    isRead: false,
  },
  {
    message: 'Longitudinal reduction defect of tibia, bilateral',
    isRead: false,
  },
  {
    message: 'Unsp inj unsp musc/fasc/tend at forarm lv, right arm, subs',
    isRead: false,
  },
  {
    message: 'Toxic effect of unsp substance, undetermined, subs encntr',
    isRead: true,
  },
  {
    message: 'Unsp inj musc/tend post grp at low leg lev, right leg, subs',
    isRead: true,
  },
  { message: 'Displ seg fx shaft of r fibula, 7thG', isRead: true },
  { message: '2-part disp fx of surg nk of l humer, 7thG', isRead: false },
  {
    message: 'Cont preg aft uterin dth of one fts or more, unsp tri, unsp',
    isRead: false,
  },
  {
    message: 'Matern care for damage to fetus by oth medical proc, fetus 2',
    isRead: true,
  },
  {
    message: 'Unspecified injury of right elbow, initial encounter',
    isRead: false,
  },
  {
    message: 'Inj intrinsic msl/tnd at ank/ft level, right foot, subs',
    isRead: false,
  },
  { message: 'Unspecified subluxation of right toe(s)', isRead: false },
  {
    message: 'Occup of hv veh injured in clsn w ped/anml nontraf, sequela',
    isRead: true,
  },
  {
    message: 'Unsp fx upper end of unsp tibia, init for opn fx type I/2',
    isRead: true,
  },
  { message: 'Underdosing of other topical agents, sequela', isRead: false },
  {
    message: 'Inj right innominate or subclavian vein, init encntr',
    isRead: false,
  },
  { message: 'Malignant neoplasm of cervix uteri, unspecified', isRead: false },
  {
    message: 'Pnctr w fb of unsp front wall of thrx w penet thor cav, sqla',
    isRead: false,
  },
  {
    message: 'Ciguatera fish poisoning, undetermined, subsequent encounter',
    isRead: false,
  },
  {
    message: 'Intentional self-harm by sword or dagger, sequela',
    isRead: false,
  },
  {
    message: 'Pasngr in pk-up/van inj in nonclsn trnsp acc in traf, init',
    isRead: true,
  },
  {
    message: 'Unsp intracranial injury w LOC of 1-5 hrs 59 min, subs',
    isRead: true,
  },
  {
    message: 'Lacerat unsp musc/fasc/tend at thigh level, unsp thigh, subs',
    isRead: false,
  },
  {
    message: 'Disp fx of dist pole of navic bone of r wrs, 7thG',
    isRead: true,
  },
  { message: 'Urethral stricture, unspecified', isRead: false },
  { message: 'Transient neonatal thrombocytopenia', isRead: true },
  {
    message: 'Puncture wound without foreign body, left lower leg, sequela',
    isRead: true,
  },
  {
    message: 'Stress fracture, right femur, subs for fx w malunion',
    isRead: false,
  },
  {
    message: 'Burn of third degree of left ear, subsequent encounter',
    isRead: true,
  },
  {
    message: 'Partial traumatic amputation of left foot, level unspecified',
    isRead: false,
  },
  { message: 'Displ spiral fx shaft of r tibia, 7thP', isRead: false },
  { message: 'Double pterygium of eye', isRead: false },
  { message: 'Hereditary hemochromatosis', isRead: true },
  {
    message: 'Unsp physl fx upper end of r tibia, subs for fx w routn heal',
    isRead: false,
  },
  {
    message: 'Pedestrian injured in collision w 2/3-whl mv in traf',
    isRead: false,
  },
  {
    message: 'Fracture of other part of scapula, left shoulder, sequela',
    isRead: true,
  },
  { message: 'Other diseases of upper respiratory tract', isRead: false },
  {
    message: 'Nondisplaced fracture of medial condyle of right femur',
    isRead: true,
  },
  {
    message: 'Displaced avulsion fx left ischium, subs for fx w delay heal',
    isRead: true,
  },
  {
    message: 'Toxic effect of gases, fumes and vapors, acc, sequela',
    isRead: true,
  },
  { message: 'Finger-joint replacement of left hand', isRead: false },
  { message: 'Twin pregnancy, monochorionic/monoamniotic', isRead: false },
  {
    message: 'External constriction of part of breast, right breast, init',
    isRead: false,
  },
  { message: 'Exposure to electric transmission lines, sequela', isRead: true },
  {
    message: 'Laceration of blood vessel of right little finger',
    isRead: true,
  },
  {
    message: 'Sltr-haris Type III physeal fx lower end of r tibia, init',
    isRead: false,
  },
  {
    message: 'Subluxation of T12/L1 thoracic vertebra, initial encounter',
    isRead: false,
  },
  {
    message: 'Sltr-haris Type I physl fx low end humer, l arm, 7thK',
    isRead: true,
  },
  { message: 'Abrasion, right ankle, sequela', isRead: true },
  {
    message: 'Driver of pk-up/van injured in collision w pedl cyc nontraf',
    isRead: false,
  },
  {
    message: 'Burn of unsp degree of lower limb, except ankle and foot',
    isRead: true,
  },
  {
    message: 'Pathological fracture, hip, unsp, init encntr for fracture',
    isRead: true,
  },
  { message: 'Other forms of leprosy', isRead: false },
  { message: 'Injury of peritoneum', isRead: true },
  {
    message: 'Other contact with other fish, initial encounter',
    isRead: false,
  },
  {
    message: 'Intentional self-harm by crashing of aircraft, init encntr',
    isRead: false,
  },
  { message: 'Benign neoplasm of extrahepatic bile ducts', isRead: false },
  { message: 'Nondisp spiral fx shaft of r tibia, 7thF', isRead: false },
  { message: 'Glaucomatous optic atrophy, bilateral', isRead: true },
  { message: 'Underdosing of intravenous anesthetics', isRead: true },
  { message: 'Acute lymphangitis of left axilla', isRead: false },
  { message: 'Drug photoallergic response', isRead: false },
  { message: 'Abrasion, left lower leg', isRead: true },
  { message: 'Other disorders of bladder', isRead: true },
  { message: 'Presence of artificial wrist joint', isRead: true },
  { message: 'Recurrent erosion of cornea', isRead: false },
  {
    message: 'Complete traumatic amp at level betw shoulder and elbow',
    isRead: false,
  },
  {
    message: 'Poisoning by phenothiazine antipsychot/neurolept, self-harm',
    isRead: false,
  },
  {
    message: 'Oth fx shaft of unsp femur, subs for clos fx w routn heal',
    isRead: true,
  },
  {
    message: 'Displaced fracture of neck of unspecified radius, sequela',
    isRead: true,
  },
  {
    message: 'Abnormal radiologic findings on diagnostic imaging of kidney',
    isRead: false,
  },
  {
    message: 'Poisoning by other synthetic narcotics, assault, subs encntr',
    isRead: true,
  },
  {
    message: 'Bent bone of unsp radius, subs for clos fx w delay heal',
    isRead: true,
  },
  {
    message: 'Hemiplegic migraine, not intractable, w/o status migrainosus',
    isRead: true,
  },
  {
    message: 'Other nondisp fx of upper end of left humerus, sequela',
    isRead: false,
  },
  { message: 'Moderate laceration of head of pancreas, sequela', isRead: true },
  {
    message: 'Breakdown of implnt elec nstim of spinal cord lead, subs',
    isRead: false,
  },
  {
    message: 'Unsp inj msl/fasc/tnd post grp at thi lev, right thigh, init',
    isRead: false,
  },
  {
    message: 'Inj superficial vein at shldr/up arm, unsp arm, subs',
    isRead: false,
  },
  {
    message: 'Blister (nonthermal), left ankle, initial encounter',
    isRead: true,
  },
  {
    message: 'Oth fracture of right femur, subs for clos fx w routn heal',
    isRead: false,
  },
  { message: 'Other hair color and hair shaft abnormalities', isRead: true },
  {
    message: 'Unspecified subluxation of left ulnohumeral joint',
    isRead: true,
  },
  {
    message: 'Posterior dislocation of left ulnohumeral joint, subs encntr',
    isRead: false,
  },
  {
    message: 'Occ of stcar injured in derail w/o antecedent clsn, init',
    isRead: false,
  },
  {
    message: 'Epidural hemorrhage w LOC of 30 minutes or less, init',
    isRead: true,
  },
  { message: 'Corrosion of second degree of lip(s), sequela', isRead: true },
  {
    message: 'Labor and delivery comp by vascular lesion of cord, fetus 4',
    isRead: true,
  },
  { message: 'Recurrent dislocation, unspecified finger', isRead: true },
  {
    message: 'Juvenile osteochondrosis of tibia and fibula, unsp leg',
    isRead: true,
  },
  {
    message: 'Fall on same level from slip/trip w strike against object',
    isRead: false,
  },
  {
    message: 'Disp fx of prox phalanx of r little finger, init for opn fx',
    isRead: true,
  },
  { message: 'Burn of esophagus', isRead: true },
  {
    message: 'Juvenile arthritis, unspecified, left ankle and foot',
    isRead: false,
  },
  {
    message: 'Inj oth blood vessels at shldr/up arm, left arm, sequela',
    isRead: false,
  },
  { message: 'Disorders of aromatic amino-acid metabolism', isRead: false },
  {
    message: 'Other injury of other urinary and pelvic organ, sequela',
    isRead: false,
  },
  { message: 'Alcoholic hepatitis', isRead: true },
  {
    message: 'Lacerat intrns musc/fasc/tend r little finger at wrs/hnd lv',
    isRead: false,
  },
  {
    message: 'Sltr-haris Type III physl fx low end rad, l arm, 7thG',
    isRead: true,
  },
  {
    message: '2-part disp fx of surg neck of l humerus, init for opn fx',
    isRead: false,
  },
  {
    message: 'Poisoning by mixed bacterial vaccines w/o a pertuss, undet',
    isRead: false,
  },
  { message: 'Toxic effects of glycols', isRead: true },
  { message: 'Schwannomatosis', isRead: true },
  {
    message: 'Complete loss of teeth due to oth cause, class II',
    isRead: false,
  },
  {
    message: 'Oth fx upper end l ulna, subs for opn fx type I/2 w nonunion',
    isRead: false,
  },
  {
    message: 'Burn of respiratory tract, part unspecified, subs encntr',
    isRead: false,
  },
  { message: 'Symptomatic neurosyphilis, unspecified', isRead: true },
  {
    message: 'Infct of amniotic sac and membranes, unsp, second trimester',
    isRead: true,
  },
  { message: 'Nonspecific reaction to test for tuberculosis', isRead: false },
  {
    message: 'Other physeal fracture of lower end of humerus, unsp arm',
    isRead: true,
  },
  {
    message: 'Greenstick fx shaft of right ulna, subs for fx w routn heal',
    isRead: false,
  },
  {
    message: 'Nondisplaced oblique fracture of shaft of unspecified femur',
    isRead: true,
  },
  { message: 'Tonic pupil, left eye', isRead: true },
  {
    message: 'Nondisp avulsion fracture of tuberosity of l calcaneus, init',
    isRead: false,
  },
  {
    message: 'Contus/lac cereb, w/o loss of consciousness, sequela',
    isRead: true,
  },
  {
    message: 'Poisoning by macrolides, accidental (unintentional), subs',
    isRead: false,
  },
  {
    message: 'War op involving intentl restrict of air/airwy, civilian',
    isRead: false,
  },
  {
    message: 'Lacerat extn musc/fasc/tend at forarm lv, right arm, sequela',
    isRead: true,
  },
  {
    message: 'Oth fx first MC bone, unsp hand, subs for fx w routn heal',
    isRead: true,
  },
  {
    message: 'Poisoning by unsp psychotropic drug, self-harm, init',
    isRead: true,
  },
  {
    message: 'Underdosing of systemic anti-infect/parasit, subs',
    isRead: true,
  },
  {
    message: 'Spontaneous rupture of flexor tendons, right forearm',
    isRead: true,
  },
  {
    message: 'Oth comp specific to multiple gest, second trimester, unsp',
    isRead: false,
  },
  {
    message: 'Partial traumatic transmetcrpl amp of right hand, init',
    isRead: true,
  },
  {
    message: 'Partial traumatic MCP amputation of left ring finger, init',
    isRead: false,
  },
  {
    message: 'Displ midcervical fx unsp femur, subs for clos fx w nonunion',
    isRead: false,
  },
  { message: 'Aphakia, unspecified eye', isRead: true },
  {
    message: 'Displaced transverse fx unsp acetabulum, init for opn fx',
    isRead: false,
  },
  {
    message: 'Non-prs chronic ulcer of left heel and midfoot w unsp severt',
    isRead: false,
  },
  {
    message: 'Poisoning by antithrombotic drugs, self-harm, init',
    isRead: false,
  },
  {
    message: 'Unsp fx left patella, subs for opn fx type 3A/B/C w nonunion',
    isRead: false,
  },
  {
    message: 'Ped on sktbrd injured in collision w hv veh in traf, sequela',
    isRead: true,
  },
  {
    message: 'Unspecified open wound of left wrist, initial encounter',
    isRead: true,
  },
  { message: 'Vitreomacular adhesion, unspecified eye', isRead: true },
  { message: 'Adverse effect of opium, subsequent encounter', isRead: false },
  {
    message: 'Occup of pk-up/van injured in clsn w unsp mv in traf, subs',
    isRead: true,
  },
  {
    message: 'Displ seg fx shaft of l femur, init for opn fx type I/2',
    isRead: false,
  },
  {
    message: 'Nondisp fx of pisiform, left wrist, subs for fx w nonunion',
    isRead: false,
  },
  {
    message: 'Corrosion of first degree of right forearm, init encntr',
    isRead: false,
  },
  {
    message: 'Partial traumatic amputation at level between hip and knee',
    isRead: true,
  },
  {
    message: 'Mechanical complication of internal joint prosthesis',
    isRead: false,
  },
  {
    message: 'Nicotine dependence, unsp, w oth nicotine-induced disorders',
    isRead: false,
  },
  { message: 'Disp fx of triquetrum bone, unsp wrs, 7thD', isRead: true },
  {
    message: 'Laceration of left quadriceps musc/fasc/tend, sequela',
    isRead: false,
  },
  { message: 'Other aneurysm', isRead: false },
  {
    message: 'Unspecified superficial injury of right hip, init encntr',
    isRead: false,
  },
  {
    message: 'Displ commnt suprcndl fx w/o intrcndl fx l humerus, sequela',
    isRead: false,
  },
  {
    message: 'Quad preg w two or more monoamnio fetuses, third trimester',
    isRead: false,
  },
  {
    message: 'Encounter for suprvsn of normal pregnancy, third trimester',
    isRead: true,
  },
  {
    message: 'Occ of anml-drn vehicle injured in clsn w nonmtr veh, subs',
    isRead: false,
  },
  {
    message: 'Poisn by dental drugs, topically applied, self-harm, sequela',
    isRead: true,
  },
  { message: 'Burn of third degree of right forearm, sequela', isRead: false },
  { message: 'Disp fx of shaft of 1st MC bone, r hand, 7thG', isRead: true },
  {
    message: 'Unsp fx second MC bone, left hand, subs for fx w delay heal',
    isRead: true,
  },
  {
    message: 'Sprain of carpal joint of left wrist, subsequent encounter',
    isRead: true,
  },
  {
    message: 'Disp fx of olecran pro w/o intartic extn l ulna, 7thB',
    isRead: false,
  },
  { message: "Charcot's joint, vertebrae", isRead: false },
  {
    message: 'Oth disp fx of upper end r humer, subs for fx w delay heal',
    isRead: false,
  },
  {
    message: 'Strain of unsp musc/fasc/tend at shldr/up arm, unsp arm',
    isRead: true,
  },
  { message: 'Oligohydramnios, unspecified trimester, fetus 3', isRead: false },
  {
    message: 'Injury of unsp nerve at shldr/up arm, unsp arm, subs',
    isRead: false,
  },
  { message: 'Other specified fracture of left pubis', isRead: false },
  {
    message: 'Type 1 diab with mild nonp rtnop without macular edema, bi',
    isRead: false,
  },
  { message: 'Other sprain of left thumb, initial encounter', isRead: false },
  {
    message: 'Unsp injury of posterior tibial artery, right leg, sequela',
    isRead: false,
  },
  {
    message: 'Laceration of intercostal blood vessels, right side, init',
    isRead: false,
  },
  { message: 'Pingueculitis, left eye', isRead: true },
  { message: 'Chronic multifocal osteomyelitis, multiple sites', isRead: true },
  {
    message: 'Lacerat abd wall w fb, right low q w/o penet perit cav, sqla',
    isRead: true,
  },
  {
    message: 'Nondisp fx of proximal phalanx of l mid finger, sequela',
    isRead: false,
  },
  { message: 'Transient neonatal myasthenia gravis', isRead: false },
  {
    message: 'Injury of digital nerve of left thumb, subsequent encounter',
    isRead: false,
  },
  { message: "Colles' fracture of left radius", isRead: false },
  {
    message: 'Opioid use, unsp w opioid-induc psych disorder w hallucin',
    isRead: false,
  },
  { message: 'Torus fracture of upper end of left humerus', isRead: false },
  {
    message: 'Sprain of unsp part of left wrist and hand, subs encntr',
    isRead: true,
  },
  {
    message: 'Ocular lac w/o prolaps/loss of intraoc tissue, r eye, sqla',
    isRead: false,
  },
  {
    message: 'Malignant neoplasm of other and ill-defined digestive organs',
    isRead: false,
  },
  {
    message: 'Unsp comp of fb acc left in body following procedure',
    isRead: true,
  },
  {
    message: 'Occupant (driver) (passenger) of hv veh injured in unsp traf',
    isRead: false,
  },
  { message: '21 weeks gestation of pregnancy', isRead: true },
  {
    message: 'Aneurysmal bone cyst, unspecified ankle and foot',
    isRead: false,
  },
  { message: 'Flaccid hemiplegia affecting right dominant side', isRead: true },
  { message: 'Oth fx low end unsp femr, 7thN', isRead: false },
  {
    message: 'Underdosing of selective serotonin reuptake inhibitors, subs',
    isRead: false,
  },
  {
    message: 'Displ bicondylar fx l tibia, subs for clos fx w delay heal',
    isRead: true,
  },
  { message: 'Toxic effect of venom of other arthropods', isRead: false },
  { message: 'Opioid dependence, uncomplicated', isRead: false },
  {
    message: 'Poisoning by unsp antipsychot/neurolept, accidental, init',
    isRead: false,
  },
  {
    message: 'Jump/div into oth water striking wall causing drown, init',
    isRead: true,
  },
  {
    message: 'Disp fx of neck of third MC bone, right hand, sequela',
    isRead: true,
  },
  {
    message: 'Toxic effect of oth inorganic substances, undetermined, init',
    isRead: true,
  },
  { message: 'Injury of abducent nerve, right side', isRead: false },
  { message: 'Assault by other bodily force, sequela', isRead: false },
  {
    message: 'Disp fx of lateral malleolus of left fibula, sequela',
    isRead: true,
  },
  {
    message: 'Minor laceration of unspecified kidney, subsequent encounter',
    isRead: true,
  },
  {
    message: 'Frostbite with tissue necrosis of left knee and lower leg',
    isRead: true,
  },
  {
    message: 'Path fracture in neoplastic disease, right fibula, sequela',
    isRead: false,
  },
  {
    message: 'Unspecified superficial injury of penis, subs encntr',
    isRead: true,
  },
  { message: 'Congenital pharyngeal pouch', isRead: false },
  { message: 'Other chronic osteomyelitis, ankle and foot', isRead: false },
  {
    message: 'Sprain of carpal joint of unspecified wrist, subs encntr',
    isRead: false,
  },
  { message: 'Other acute osteomyelitis, left radius and ulna', isRead: false },
  { message: 'Myositis ossificans traumatica, multiple sites', isRead: false },
  {
    message: 'Strain of musc/fasc/tend at shldr/up arm, right arm, sequela',
    isRead: false,
  },
  { message: 'Long term (current) use of aspirin', isRead: false },
  {
    message: 'Chronic postrheumatic arthropathy [Jaccoud], right hip',
    isRead: true,
  },
  {
    message: 'Sltr-haris Type II physl fx low end l tibia, 7thG',
    isRead: false,
  },
  { message: 'Malignant neoplasm of overlapping sites of lip', isRead: false },
  {
    message: 'Sltr-haris Type IV physl fx low end unsp femr, 7thD',
    isRead: false,
  },
  {
    message: 'Dislocation of radiocarpal joint of unsp wrist, subs encntr',
    isRead: true,
  },
  {
    message: 'Nondisp fx of fifth metatarsal bone, right foot, sequela',
    isRead: false,
  },
  {
    message: 'Laceration w/o fb of left lesser toe(s) w damage to nail',
    isRead: true,
  },
  { message: 'Toxic effect of venom of hornets, assault', isRead: true },
  {
    message: 'Unsp comp of fb acc left in body following kidney dialysis',
    isRead: true,
  },
  {
    message: 'Rheu lung disease w rheumatoid arthritis of unsp shoulder',
    isRead: false,
  },
  {
    message: 'Strain of musc/fasc/tend at shldr/up arm, left arm, init',
    isRead: true,
  },
  {
    message: 'Nondisp fx of coracoid pro, l shldr, subs for fx w nonunion',
    isRead: true,
  },
  {
    message: 'Theraputc and rehab gen hosp/persnl-use dev assoc w incdt',
    isRead: true,
  },
  {
    message: 'Strain of flexor musc/fasc/tend at forearm level, left arm',
    isRead: true,
  },
  { message: 'Nondisp fx of med condyle of r tibia, 7thF', isRead: false },
  {
    message: 'Unsp inj musc/tend the rotator cuff of l shoulder, subs',
    isRead: true,
  },
  {
    message: 'Superficial frostbite of right hand, initial encounter',
    isRead: false,
  },
  {
    message: 'Oth and unsp congenital malformations of testis and scrotum',
    isRead: true,
  },
  {
    message: 'Oth injuries of left wrist, hand and finger(s), sequela',
    isRead: false,
  },
  {
    message: 'Chloasma of right lower eyelid and periocular area',
    isRead: true,
  },
  {
    message: 'Lac w/o fb of l frnt wl of thorax w/o penet thor cav, subs',
    isRead: true,
  },
  {
    message: 'Corrosion of first degree of neck, subsequent encounter',
    isRead: true,
  },
  {
    message: 'Pathological fracture, left fibula, subs for fx w malunion',
    isRead: true,
  },
  {
    message: 'Nondisp fx of lunate, unsp wrist, subs for fx w malunion',
    isRead: false,
  },
  {
    message: 'Agents primarily acting on the respiratory system',
    isRead: false,
  },
  {
    message: 'Encounter for fitting and adjustment of other devices',
    isRead: true,
  },
  { message: 'Displ commnt fx r patella, 7thQ', isRead: false },
  { message: 'Dislocation of left scapula, initial encounter', isRead: true },
  {
    message: 'Rheu heart disease w rheumatoid arthritis of right hand',
    isRead: false,
  },
  {
    message: 'Maternal care for oth isoimmun, unsp trimester, fetus 3',
    isRead: true,
  },
  {
    message: 'Pnctr w foreign body of l rng fngr w damage to nail, subs',
    isRead: false,
  },
  { message: 'Assault by machine gun', isRead: true },
  { message: 'Mixed hyperlipidemia', isRead: true },
  {
    message: 'Athscl type of bypass of the right leg w ulceration of calf',
    isRead: false,
  },
  {
    message: 'Unsp injury of dorsal artery of right foot, init encntr',
    isRead: true,
  },
  { message: 'Contact with other hot fluids, sequela', isRead: false },
  {
    message: 'Sltr-haris Type III physeal fx upper end of left tibia, init',
    isRead: true,
  },
  {
    message: 'Other specified injuries of left lower leg, init encntr',
    isRead: true,
  },
  { message: 'Primary blast injury of left ear', isRead: true },
  {
    message: 'Encounter for adjustment or removal of right breast implant',
    isRead: true,
  },
  {
    message: 'Other fracture of lower end of left ulna, sequela',
    isRead: false,
  },
  {
    message: 'Nondisp fx of medial phalanx of oth finger, init for opn fx',
    isRead: false,
  },
  {
    message: 'Complete traum amp at lev betw kn and ankl, l low leg, init',
    isRead: true,
  },
  {
    message: 'Terorsm w explosn of marine weap, publ sfty offcl inj, init',
    isRead: true,
  },
  { message: 'Unequal limb length (acquired), left ulna', isRead: false },
  {
    message: 'Unspecified balloon accident injuring occupant, sequela',
    isRead: false,
  },
  { message: 'Nondisp seg fx shaft of r tibia, 7thG', isRead: true },
  {
    message: 'Lacerat extensor musc/fasc/tend l rng fngr at wrs/hnd lv',
    isRead: true,
  },
  { message: 'Unsp fx shaft of r fibula, 7thR', isRead: false },
  {
    message: 'Disp fx of base of third metacarpal bone, right hand',
    isRead: false,
  },
  {
    message: 'Unsp inj unsp blood vess at hip and thi lev, unsp leg, init',
    isRead: true,
  },
  {
    message: 'Exposure to other furniture fire due to burning cigarette',
    isRead: true,
  },
  {
    message: 'Laceration of oth muscles, fascia and tendons at thigh level',
    isRead: true,
  },
  {
    message: 'Unsp inj great saphenous at low leg level, left leg, sequela',
    isRead: false,
  },
  {
    message: 'Car driver injured in collision w hv veh in traf, subs',
    isRead: false,
  },
  { message: 'Menopausal and female climacteric states', isRead: false },
  {
    message: 'Sltr-haris Type I physl fx upr end r tibia, 7thP',
    isRead: false,
  },
  {
    message: 'Frostbite with tissue necrosis of unsp sites, init encntr',
    isRead: false,
  },
  {
    message: 'Lac w/o fb of abd wall, left lower q w penet perit cav',
    isRead: false,
  },
  { message: 'Disp fx of l radial styloid pro, 7thF', isRead: true },
  {
    message: 'Poisoning by oth viral vaccines, accidental, sequela',
    isRead: false,
  },
  {
    message: 'Toxic effect of oth metals, accidental (unintentional), subs',
    isRead: false,
  },
  {
    message: 'Personal history of malignant neoplasm of renal pelvis',
    isRead: false,
  },
  { message: 'Mixed obsessional thoughts and acts', isRead: true },
  {
    message: 'Maternal care for viable fetus in abd preg, second tri, unsp',
    isRead: false,
  },
  { message: 'Gout due to renal impairment, vertebrae', isRead: true },
  {
    message: 'Other disorders of bile acid and cholesterol metabolism',
    isRead: false,
  },
  {
    message: 'Other superficial bite of right forearm, subs encntr',
    isRead: true,
  },
  {
    message: 'Oth fracture of right patella, subs for clos fx w malunion',
    isRead: true,
  },
  {
    message: 'Disp fx of r ulna styloid pro, subs for clos fx w delay heal',
    isRead: false,
  },
  {
    message: 'Encounter for exam of blood pressure w abnormal findings',
    isRead: true,
  },
  {
    message: "Displaced Rolando's fracture, left hand, sequela",
    isRead: false,
  },
  {
    message: 'Laceration of unsp msl/tnd at ank/ft level, right foot, subs',
    isRead: false,
  },
  { message: 'Other secondary kyphosis, cervicothoracic region', isRead: true },
  {
    message: 'Osteonecrosis due to previous trauma, multiple sites',
    isRead: false,
  },
  {
    message: 'Injury of acoustic nerve, unspecified side, sequela',
    isRead: true,
  },
  {
    message: 'Unsp fb in resp tract, part unsp causing oth injury',
    isRead: false,
  },
  {
    message: 'Driver of pk-up/van injured in collision w unsp mv nontraf',
    isRead: true,
  },
  { message: 'Birth injury to spleen', isRead: true },
  {
    message: 'Pnctr of abd wl w fb, periumb rgn w/o penet perit cav, sqla',
    isRead: true,
  },
  {
    message: 'Fx subcondylar process of mandible, unspecified side, 7thB',
    isRead: false,
  },
  {
    message: 'Infection oth prt genitl trct in pregnancy, third trimester',
    isRead: false,
  },
  {
    message: 'Nondisplaced fracture of shaft of unspecified clavicle',
    isRead: true,
  },
  {
    message: 'Partial traumatic transphalangeal amputation of r mid finger',
    isRead: false,
  },
  { message: 'Burn of second degree of left elbow', isRead: false },
  {
    message: 'Primary blast injury of bronchus, unilateral, sequela',
    isRead: true,
  },
  { message: 'Nondisp spiral fx shaft of r femr, 7thD', isRead: false },
  { message: 'Asphyxiation due to plastic bag', isRead: false },
  { message: 'Injury of unspecified nerve at lower leg level', isRead: false },
  {
    message: 'Pnctr w/o fb of unsp frnt wl of thrx w penet thor cav, init',
    isRead: false,
  },
  {
    message: 'Unsp intracap fx right femur, init for opn fx type 3A/B/C',
    isRead: true,
  },
  {
    message: 'Severely displ Zone I fx sacrum, subs for fx w routn heal',
    isRead: false,
  },
  {
    message: 'Mech compl of oth bone devices, implants and grafts, subs',
    isRead: false,
  },
  {
    message: 'Maternal care for excess fetal growth, unsp trimester, unsp',
    isRead: false,
  },
  { message: 'Discharge of firework', isRead: false },
  {
    message: 'Fx unsp tarsal bone(s) of unsp foot, subs for fx w nonunion',
    isRead: false,
  },
  {
    message: 'Age-related osteopor w current path fracture, unsp shoulder',
    isRead: false,
  },
  {
    message: 'Displaced apophyseal fx r femur, init for opn fx type 3A/B/C',
    isRead: false,
  },
  { message: 'Nondisp unsp condyle fx low end r femr, 7thM', isRead: true },
  {
    message: 'Hemiplga fol oth ntrm intcrn hemor aff left nondom side',
    isRead: true,
  },
  { message: 'Contact blepharoconjunctivitis, left eye', isRead: false },
  {
    message: 'Poisoning by smallpox vaccines, self-harm, sequela',
    isRead: false,
  },
  {
    message: 'Rheumatoid myopathy with rheumatoid arthritis of unsp site',
    isRead: false,
  },
  {
    message: 'Open bite of left little finger w/o damage to nail, init',
    isRead: false,
  },
  {
    message: 'Laceration of musc/fasc/tend prt biceps, unsp arm, sequela',
    isRead: true,
  },
  { message: 'Blood alcohol level of 200-239 mg/100 ml', isRead: true },
  { message: 'Nondisp transverse fx shaft of r tibia, 7thG', isRead: true },
  {
    message: 'Eczematous dermatitis of left eye, unspecified eyelid',
    isRead: true,
  },
  {
    message: 'Unsp inj extn musc/fasc/tend r rng fngr at forarm lv, sqla',
    isRead: false,
  },
  { message: 'Central hemorrhagic necrosis of liver', isRead: true },
  {
    message: 'Other superficial bite of left front wall of thorax',
    isRead: false,
  },
  { message: 'Retinal edema', isRead: true },
  { message: 'Chronic sialoadenitis', isRead: true },
  { message: 'Disp fx of lateral malleolus of r fibula, 7thJ', isRead: true },
  { message: 'Hemarthrosis, unspecified hip', isRead: false },
  {
    message: 'Toxic effect of venom of wasps, intentional self-harm, init',
    isRead: true,
  },
  {
    message: 'Corros first deg mult sites of left shldr/up lmb, ex wrs/hnd',
    isRead: true,
  },
  {
    message: 'Injury of oculomotor nerve, left side, subsequent encounter',
    isRead: false,
  },
  { message: 'Elevated prostate specific antigen [PSA]', isRead: false },
  {
    message: 'External constriction of scrotum and testes, sequela',
    isRead: false,
  },
  {
    message: 'Cannabis use, unsp with psychotic disorder with delusions',
    isRead: false,
  },
  {
    message: 'Nondisp segmental fracture of shaft of unsp fibula, sequela',
    isRead: true,
  },
  {
    message: 'Puncture wound with foreign body of right elbow, sequela',
    isRead: false,
  },
  { message: 'Tidal wave due to storm', isRead: true },
  {
    message: 'Sprain of unspecified parts of left shoulder girdle',
    isRead: false,
  },
  {
    message: 'Intcran inj w/o loss of consciousness, subs encntr',
    isRead: false,
  },
  {
    message: 'Brown-Sequard syndrome at T1 level of thoracic spinal cord',
    isRead: true,
  },
  { message: 'Other cyst of bone, unspecified lower leg', isRead: true },
  { message: 'Nondisp fx of med epicondyl of r humer, 7thD', isRead: false },
  {
    message: 'Burn of first degree of unspecified scapular region, sequela',
    isRead: true,
  },
  {
    message: 'Calculus of GB and bile duct w/o cholecyst w obstruction',
    isRead: true,
  },
  { message: 'Other obesity', isRead: true },
  {
    message: 'Fx unsp phalanx of l little finger, subs for fx w routn heal',
    isRead: false,
  },
  {
    message: 'Torus fx upper end of unsp humerus, subs for fx w routn heal',
    isRead: false,
  },
  { message: 'Fall from in-line roller-skates, sequela', isRead: false },
  {
    message: 'Oth physeal fracture of upper end of unsp femur, init',
    isRead: true,
  },
  {
    message: 'Contusion of scrotum and testes, initial encounter',
    isRead: true,
  },
];

module.exports = messages;
