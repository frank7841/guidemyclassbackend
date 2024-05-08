// const { gql } = require("apollo-server");

const typeDefs = `#graphql

 type UserAccounts {
    _id: ID!
    username: String
    phone_number: String
    email: String!
    role:String
    createdAt: String!
    updatedAt: String!
  }

  type Work {
    _id: ID!
    workType: String!
    amount: String
    createdAt: String!
    updatedAt: String!
  }

  type Boostwork {
    _id: ID!
    title: String!
    description: String!
    price: String!
    createdAt: String!
    updatedAt: String!
  }

  type Service {
    _id: ID!
    service: String!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }
  type Guarantees {
    _id: ID!
    description: String!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }
  type Words {
    _id: ID!
    words: String!
    createdAt: String!
    updatedAt: String!
  }
  type DaysOfCompletion {
    _id: ID!
    days: String!
    createdAt: String!
    updatedAt: String!
  }
  type Subject {
    _id: ID!
    subjectName: String!
    createdAt: String!
    updatedAt: String!
  }
  type Faq {
    _id: ID!
    question: String!
    answer: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }
  type Source {
    _id: ID!
    sourcename: String!
    createdAt: String!
    updatedAt: String!
  }
  type ReferencingStyleType {
    _id: ID!
    referencingStyleType: String!
    amount: String
    createdAt: String!
    updatedAt: String!
  }
  type Ratings {
    _id: ID!
    rates: String!
    createdAt: String!
    updatedAt: String!
  }
  type Language {
    _id: ID!
    language: String!
    createdAt: String!
    updatedAt: String!
  }
  type ExpertLevel {
    _id: ID!
    expertLevel: String!
    amount: String
    createdAt: String!
    updatedAt: String!
  }

  type AcademicLevel {
    _id: ID!
    academicLevel: String!
    amount: String
    createdAt: String!
    updatedAt: String!
  }
  type PriceRates {
    _id: ID!
    hourlyRate: String!
    pricePerSinglePage: String!
    pricePerDoublePage: String!
    createdAt: String!
    updatedAt: String!
  }
  type Order {
    _id: ID!
    work: Work!
    academicLevel: AcademicLevel
    expertLevel: ExpertLevel
    email: String
    user: UserAccounts
    noOfPages: String
    deadline: String
    urgency: String
    phonenumber: String
    price: String
    payment: String
    status: String
    noOfSources: String
    referencingStyle: ReferencingStyleType
    topic: String
    subject: Subject
    attachmentUrl: [String!]
    instructions: String
    boostServices: [Boostwork!]
    createdAt: String!
    updatedAt: String!
  }
 
  type userLogin {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    username: ID
    role: ID
  }

  type LogoutData {
    userId: ID
    username: ID
    role: ID
    token: String
    tokenExpiration: Int
  }
  input CreateAcc {
    username: String!
    email: String!
    phone_number: String!
    password: String!
    confirmpassword: String!
  }
  
  
  input ServiceCreate {
    service: String!
    title: String!
    content: String!
  }
  input updateService {
    _id:ID!
    service: String
    title: String
    content: String
  }
  input GuaranteesCreate {
    description: String!
    title: String!
    content: String!
  }
  input updateGuarantees {
    _id:ID!
    description: String
    title: String
    content: String
  }
  
  input createOrderInput {
    
    academicLevel: ID!
    work: ID!
    expertLevel: ID!
    email: String!
    user: ID!
    noOfPages: String!
    deadline: String!
    urgency: String!
    phonenumber: String!
    price: String!
    payment: String!
    noOfSources: String!
    referencingStyle: ID!
    topic: String
    instructions: String
    subject: ID!
    attachmentUrl: String
    boostServices: [ID]
  }

  input updateFaq {
    _id: ID!
   question: String
   answer: String
   status: String
  }
  input updateacademicLevel {
    _id: ID!
   academicLevel: String
   amount: String
  }
  input updatework {
    _id: ID!
   workType: String
   amount: String
  }
  input updatesubject {
    _id: ID!
  subjectName: String
  }
  input updatesource {
    _id: ID!
  sourcename: String
  }
  input updatereferencestyle {
    _id: ID!
  referencingStyleType: String
  amount: String
  }
  input updateratings {
    _id: ID!
  rates: String
  }
  input updatelanguage {
    _id: ID!
  language: String
  }
  input updateexpertlevel {
    _id: ID!
  experLevel: String
  }
  input updatepricerates {
    _id: ID!
    hourlyRate: String
    pricePerSinglePage: String
    pricePerDoublePage: String
  }
  input updateboostrates {
    _id: ID!
    title: String
    description: String
    price: String
  }

  input updateOrderInput {
    _id:ID!
    academicLevel: ID
    work: ID
    expertLevel: ID
    email: String
    user: ID
    noOfPages: String
    deadline: String
    urgency: String
    phonenumber: String
    price: String
    payment: String
    noOfSources: String
    referencingStyle: ID
    topic: String
    instructions: String
    subject: ID
    attachmentUrl: String
    boostServices: ID
  }
  input updateAcc {
    username: String
    email: String
    phone_number: String
  }
  input updatePassword {
    password: String
    confirmpassword: String
  }

  type Query {
    allServices(limit: Int, offset: Int): [Service!]
    oneServices(serviceId: ID!): Service!
    allPriceRates(limit: Int, offset: Int): [PriceRates!]
    onePriceRates(priceRateId: ID!): PriceRates!
    allBoostRates(limit: Int, offset: Int): [Boostwork!]
    oneBoostRates(priceRateId: ID!): Boostwork!
    allGuarantees(limit: Int, offset: Int): [Guarantees!]
    oneGuarantees(guaranteeId: ID!): Guarantees!
    allusers(limit: Int, offset: Int): [UserAccounts!]
    oneuser(userId: ID!): UserAccounts
    currentuser: UserAccounts
    logoutuser: LogoutData
    allWork(limit: Int, offset: Int): [Work!]
    allWords(limit: Int, offset: Int): [Words!]
    allDaysOfCompletion(limit: Int, offset: Int): [DaysOfCompletion!]
    oneWork(workId:ID!): Work!
    oneWord(wordId:ID!): Words!
    oneDayOfCompletion(dayId:ID!): DaysOfCompletion!
    allSubjects: [Subject!]
    oneSubject(subjectId:ID!): Subject!
    allSource: [Source!]
    oneSource(sourceId:ID!): Source!
    referencingStyles(limit: Int, offset: Int): [ReferencingStyleType!]
    onereferencestyle(referenceId: ID!): ReferencingStyleType!
    ratings(limit: Int, offset: Int): [Ratings!]
    oneRating(ratingId: ID!): Ratings!
    languages(limit: Int, offset: Int): [Language!]
    onelanguage(languageId: ID!): Language!
    expertLevels(limit: Int, offset: Int): [ExpertLevel!]
    oneexpertLevel(expertId: ID!): ExpertLevel!
    academicLevels(limit: Int, offset: Int): [AcademicLevel!]
    oneAcademicLevel(academicId: ID!): AcademicLevel!
    orders(limit: Int, offset: Int): [Order!]
    myorders(limit: Int, offset: Int): [Order!]
    oneOrders(orderId: ID!): Order!
    faqs(limit: Int, offset: Int): [Faq!]
    onefaq(faqId: ID!): Faq!
  }

  type Mutation {
    updateuser(input: updateAcc): UserAccounts!
    updatepassword(input: updatePassword): UserAccounts!
    requestResetPassword(email: String): UserAccounts!
    resetpassword(token: String,id: String,confirmPassword: String,password: String): UserAccounts!
    login(email:String!, password: String!): AuthData!
    createUser(createAcc: CreateAcc): UserAccounts
    createWork(workType: String!, amount: String!): Work!
    updateWork(input:updatework): Work!
    deleteWork(workId: ID!): Work!
    createPriceRates(hourlyRate: String!, pricePerSinglePage: String!,pricePerDoublePage: String!): PriceRates!
    updatePriceRates(input:updatepricerates): PriceRates!
    deletePriceRates(priceRateId: ID!): PriceRates!
    createBoostRates(title: String!, description: String!,price: String!): Boostwork!
    updateBoostRates(input:updateboostrates): Boostwork!
    deleteBoostRates(boostId: ID!): Boostwork!
    createWord(word: String!): Words!
    createDaysOfCompletion(days: String!): DaysOfCompletion!
    deleteWord(wordId:ID!): Words!
    deleteDayOfCompletion(dayId:ID!): DaysOfCompletion!
    createSubject(subjectName: String!): Subject!
    updateSubject(input: updatesubject): Subject!
    deleteSubject(subjectId: ID!): Subject!
    createSource(sourcename: String!): Source!
    updateSource(input: updatesource ): Source!
    deleteSource(sourceId: ID!): Source!
    createReferenceStyle(referencingStyleType: String!, amount: String!): ReferencingStyleType!
    updateReferenceStyle(input: updatereferencestyle): ReferencingStyleType!
    deleteReferenceStyle(referenceId: ID!): ReferencingStyleType!
    createRatings(rates: String!): Ratings!
    updateRatings(input: updateratings): Ratings!
    deleteRatings(ratingId: ID!): Ratings!
    createLanguage(language: String!): Language!
    updateLanguage(input: updatelanguage): Language!
    deleteLanguage(languageId: ID!): Language!
    createExpertLevel(expertLevel: String!): ExpertLevel!
    updateExpertLevel(input:updateexpertlevel ): ExpertLevel!
    deleteExpertLevel(expertId: ID!): ExpertLevel!
    createAcademicLevel(academicLevel: String!, amount: String!): AcademicLevel!
    updateAcademicLevel(input: updateacademicLevel): AcademicLevel!
    deleteAcademicLevel(academicId: ID!): AcademicLevel!
    createOrder(createorder: createOrderInput): Order!
    updateOrder(updateorder: updateOrderInput): Order!
    deleteOrder(orderId: ID!): Order!
    createFaq(question: String!, answer: String!): Faq!
    updatefaqs(input: updateFaq): Faq!
    deletefaq(faqId: ID!): Faq!
    createService(createservice: ServiceCreate): Service!
    deleteService(serviceId: ID!): Service!
    updateServices(updateService: updateService): Service!
    createGuarantee(createguarantee: GuaranteesCreate): Guarantees!
    deleteGuarantee(guaranteeId: ID!): Guarantees!
    updateGuarantees(updateGuarantee: updateGuarantees): Guarantees!
  }
  
`;

module.exports = typeDefs;
