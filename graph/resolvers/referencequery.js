const Subject = require("../../models/subject");
const Word = require("../../models/words");
const DaysOfCompletion = require("../../models/daysOfCompletion");
const Source = require("../../models/source");
const ReferencingStyleType = require("../../models/referencingstyle");
const Ratings = require("../../models/ratings");
const Language = require("../../models/language");
const ExpertLevel = require("../../models/expertlevel");
const AcademicLevel = require("../../models/academiclevel");
const {
  transformSource,
  transformReference,
  transformSubject,
  transformLanguage,
  transformExpertLevel,
  transformAcademicLevel,
  transformRatings,
  transformWord,
  transformDayOfCompletion,
} = require("./merge");

module.exports = {
  allSubjects: async (_, args, context, req) => {
    try {
      //find all users
      const subjects = await Subject.find().skip(args.offset).limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return subjects.map((subject) => {
        //return a well formed details about users
        return transformSubject(subject);
      });
    } catch (err) {
      throw err;
    }
  },
  allWords: async (_, args, context, req) => {
    try {
      //find all users
      const words = await Word.find().skip(args.offset).limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return words.map((word) => {
        //return a well formed details about users
        return transformWord(word);
      });
    } catch (err) {
      throw err;
    }
  },
  allDaysOfCompletion: async (_, args, context, req) => {
    try {
      //find all users
      const days = await DaysOfCompletion.find()
        .skip(args.offset)
        .limit(args.limit);

      // const indexes = await UserAcc.getIndexes();
      // console.log(indexes);
      // return events;
      return days.map((day) => {
        //return a well formed details about users
        return transformDayOfCompletion(day);
      });
    } catch (err) {
      throw err;
    }
  },

  oneSubject: async (_, args, context) => {
    const subject = await Subject.findOne({
      _id: args.subjectId,
    });
    if (!subject) {
      throw new Error("subject does not exist");
    }

    const issubject = transformSubject(subject);
    return issubject;
  },
  oneWord: async (_, args, context) => {
    const word = await Word.findOne({
      _id: args.wordId,
    });
    if (!word) {
      throw new Error("word does not exist");
    }

    const isword = transformWord(word);
    return isword;
  },
  oneDayOfCompletion: async (_, args, context) => {
    const day = await DaysOfCompletion.findOne({
      _id: args.dayId,
    });
    if (!day) {
      throw new Error("day does not exist");
    }

    const isday = transformDayOfCompletion(day);
    return isday;
  },
  allSource: async (_, args, context, req) => {
    try {
      //find all users
      const sources = await Source.find().skip(args.offset).limit(args.limit);

      return sources.map((source) => {
        //return a well formed details about source
        return transformSource(source);
      });
    } catch (err) {
      throw err;
    }
  },

  oneSource: async (_, args, context) => {
    const source = await Source.findOne({
      _id: args.sourceId,
    });
    if (!source) {
      throw new Error("source does not exist");
    }

    const isSource = transformSource(source);
    return isSource;
  },
  referencingStyles: async (_, args, context, req) => {
    try {
      //find all users
      const references = await ReferencingStyleType.find()
        .skip(args.offset)
        .limit(args.limit);

      return references.map((reference) => {
        //return a well formed details about reference
        return transformReference(reference);
      });
    } catch (err) {
      throw err;
    }
  },

  onereferencestyle: async (_, args, context) => {
    const reference = await ReferencingStyleType.findOne({
      _id: args.referenceId,
    });
    if (!reference) {
      throw new Error("reference does not exist");
    }

    const isreference = transformReference(reference);
    return isreference;
  },
  ratings: async (_, args, context, req) => {
    try {
      //find all users
      const ratings = await Ratings.find().skip(args.offset).limit(args.limit);

      return ratings.map((rating) => {
        //return a well formed details about reference
        return transformRatings(rating);
      });
    } catch (err) {
      throw err;
    }
  },

  oneRating: async (_, args, context) => {
    const rating = await Ratings.findOne({ _id: args.ratingId });
    if (!rating) {
      throw new Error("rating does not exist");
    }

    const israting = transformRatings(reference);
    return israting;
  },
  languages: async (_, args, context, req) => {
    try {
      //find all users
      const ratings = await Language.find().skip(args.offset).limit(args.limit);

      return ratings.map((rating) => {
        //return a well formed details about reference
        return transformLanguage(rating);
      });
    } catch (err) {
      throw err;
    }
  },

  onelanguage: async (_, args, context) => {
    const language = await Language.findOne({ _id: args.ratingId });
    if (!language) {
      throw new Error("Language does not exist");
    }

    const islanguage = transformLanguage(language);
    return islanguage;
  },
  expertLevels: async (_, args, context, req) => {
    try {
      //find all users
      const expertLevels = await ExpertLevel.find()
        .skip(args.offset)
        .limit(args.limit);

      return expertLevels.map((expertLevel) => {
        //return a well formed details about reference
        return transformExpertLevel(expertLevel);
      });
    } catch (err) {
      throw err;
    }
  },

  oneexpertLevel: async (_, args, context) => {
    const expertLevel = await ExpertLevel.findOne({ _id: args.expertId });
    if (!expertLevel) {
      throw new Error("expertLevel does not exist");
    }

    const isexpertLevel = transformExpertLevel(expertLevel);
    return isexpertLevel;
  },
  academicLevels: async (_, args, context, req) => {
    try {
      //find all users
      const academiclevels = await AcademicLevel.find()
        .skip(args.offset)
        .limit(args.limit);

      return academiclevels.map((academiclevel) => {
        //return a well formed details about reference
        return transformAcademicLevel(academiclevel);
      });
    } catch (err) {
      throw err;
    }
  },

  oneAcademicLevel: async (_, args, context) => {
    const academiclevel = await AcademicLevel.findOne({ _id: args.academicId });
    if (!academiclevel) {
      throw new Error("academiclevel does not exist");
    }

    const isacademiclevel = transformAcademicLevel(academiclevel);
    return isacademiclevel;
  },
};
