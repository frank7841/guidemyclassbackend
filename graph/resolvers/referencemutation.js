const Subject = require("../../models/subject");
const Source = require("../../models/source");
const ReferencingStyleType = require("../../models/referencingstyle");
const Ratings = require("../../models/ratings");
const Language = require("../../models/language");
const ExpertLevel = require("../../models/expertlevel");
const AcademicLevel = require("../../models/academiclevel");

const Word = require("../../models/words");
const DaysOfCompletion = require("../../models/daysOfCompletion");
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
  createSubject: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedSubject = new Subject({
        subjectName: args.subjectName,
      });

      const result = await addedSubject.save();

      return transformSubject(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createWord: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedWord = new Word({
        words: args.word,
        amount: args.amount,
      });

      const result = await addedWord.save();

      return transformWord(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createDaysOfCompletion: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedDays = new DaysOfCompletion({
        days: args.days,
      });

      const result = await addedDays.save();

      return transformDayOfCompletion(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateSubject: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Subject.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Subject has not been updated");
      }
      return transformSubject(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createSource: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const addedSource = new Source({
        sourcename: args.sourcename,
      });

      const result = await addedSource.save();

      return transformSource(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateSource: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Source.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Source has not been updated");
      }
      return transformSource(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createReferenceStyle: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedRefence = new ReferencingStyleType({
        referencingStyleType: args.referencingStyleType,
        amount: args.amount,
      });

      const result = await addedRefence.save();

      return transformReference(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateReferenceStyle: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await ReferencingStyleType.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("ReferencingStyleType has not been updated");
      }
      return transformReference(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createRatings: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedRefence = new Ratings({
        referencingStyleType: args.referencingStyleType,
      });

      const result = await addedRefence.save();

      return transformRatings(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateRatings: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Ratings.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Ratings has not been updated");
      }
      return transformRatings(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createLanguage: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedLanguage = new Language({
        language: args.language,
      });

      const result = await addedLanguage.save();

      return transformLanguage(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateLanguage: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Language.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("Language has not been updated");
      }
      return transformLanguage(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createExpertLevel: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedExpertLevel = new ExpertLevel({
        expertLevel: args.expertLevel,
      });

      const result = await addedExpertLevel.save();

      return transformExpertLevel(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateExpertLevel: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await ExpertLevel.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("ExpertLevel has not been updated");
      }
      return transformExpertLevel(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createAcademicLevel: async (parent, args, context) => {
    // if (!context.req.isAuth) {
    //   throw new Error("unauthorized");
    // }

    try {
      const addedAcademicLevel = new AcademicLevel({
        academicLevel: args.academicLevel,
        amount: args.amount,
      });

      const result = await addedAcademicLevel.save();

      return transformAcademicLevel(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateAcademicLevel: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await AcademicLevel.findOneAndUpdate(
        { _id: input._id },
        input,
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("AcademicLevel has not been updated");
      }
      return transformAcademicLevel(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteSubject: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const subject = await Subject.findOne({
        _id: args.subjectId,
      });
      if (!subject) {
        throw new Error("Subject not found");
      }

      await Subject.deleteOne({ _id: args.subjectId });

      return transformSubject(subject);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteWord: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const word = await Word.findOne({
        _id: args.wordId,
      });
      if (!word) {
        throw new Error("Word not found");
      }

      await Word.deleteOne({ _id: args.wordId });

      return transformWord(word);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteWord: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const days = await DaysOfCompletion.findOne({
        _id: args.dayId,
      });
      if (!days) {
        throw new Error("days not found");
      }

      await DaysOfCompletion.deleteOne({ _id: args.dayId });

      return transformDayOfCompletion(days);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteSource: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const source = await Source.findOne({
        _id: args.sourceId,
      });
      if (!source) {
        throw new Error("source not found");
      }

      await Source.deleteOne({ _id: args.sourceId });

      return transformSource(source);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteReferenceStyle: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const reference = await ReferencingStyleType.findOne({
        _id: args.referenceId,
      });
      if (!reference) {
        throw new Error("reference not found");
      }

      await ReferencingStyleType.deleteOne({ _id: args.referenceId });

      return transformReference(reference);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteRatings: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const rating = await Ratings.findOne({
        _id: args.ratingId,
      });
      if (!rating) {
        throw new Error("rating not found");
      }

      await Ratings.deleteOne({ _id: args.ratingId });

      return transformReference(rating);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteLanguage: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const language = await Language.findOne({
        _id: args.languageId,
      });
      if (!language) {
        throw new Error("language not found");
      }

      await Language.deleteOne({ _id: args.languageId });

      return transformReference(language);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteExpertLevel: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const expertLevel = await ExpertLevel.findOne({
        _id: args.expertId,
      });
      if (!expertLevel) {
        throw new Error("Expert level not found");
      }

      await ExpertLevel.deleteOne({ _id: args.expertId });

      return transformExpertLevel(expertLevel);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteAcademicLevel: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const academiclevel = await AcademicLevel.findOne({
        _id: args.academicId,
      });
      if (!academiclevel) {
        throw new Error("Academic Level not found");
      }

      await AcademicLevel.deleteOne({ _id: args.academicId });

      return transformAcademicLevel(academiclevel);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
