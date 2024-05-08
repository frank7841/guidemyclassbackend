const DataLoader = require("dataloader");
const UserAcc = require("../../models/useraccounts");
const { datetoString } = require("../../helpers/date");

const Subject = require("../../models/subject");
const Source = require("../../models/source");
const ReferencingStyleType = require("../../models/referencingstyle");
const Ratings = require("../../models/ratings");
const Language = require("../../models/language");
const ExpertLevel = require("../../models/expertlevel");
const AcademicLevel = require("../../models/academiclevel");
const Work = require("../../models/work");
const Order = require("../../models/order");
const Faq = require("../../models/faq");
const Word = require("../../models/words");
const DaysOfCompletion = require("../../models/daysOfCompletion");
const BoostWork = require("../../models/boostWork");

const useraccLoader = new DataLoader((userIds) => {
  // console.log(userIds)
  return creatorUser(userIds);
});
const subjectLoader = new DataLoader((eventIds) => {
  // console.log(userIds)
  return subjects(eventIds);
});
const sourceLoader = new DataLoader((eventIds) => {
  // console.log(userIds)
  return sources(eventIds);
});
const referenceLoader = new DataLoader((eventIds) => {
  // console.log(userIds)
  return references(eventIds);
});
const ratingLoader = new DataLoader((eventIds) => {
  return ratings(eventIds);
});
const languageLoader = new DataLoader((eventIds) => {
  return languages(eventIds);
});
const expertlevelLoader = new DataLoader((eventIds) => {
  return expertlevels(eventIds);
});
const academiclevelLoader = new DataLoader((eventIds) => {
  return academiclevels(eventIds);
});
const workLoader = new DataLoader((eventIds) => {
  return works(eventIds);
});
const orderLoader = new DataLoader((eventIds) => {
  return orders(eventIds);
});
const wordLoader = new DataLoader((eventIds) => {
  return words(eventIds);
});
const dayofCompletionLoader = new DataLoader((eventIds) => {
  return daysofCompletion(eventIds);
});
const boostRatesLoader = new DataLoader((eventIds) => {
  return boostrates(eventIds);
});
const subjects = async (eventIds) => {
  try {
    const events = await Subject.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformSubject(event);
    });
  } catch (err) {
    throw err;
  }
};
const words = async (eventIds) => {
  try {
    const events = await Word.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformWord(event);
    });
  } catch (err) {
    throw err;
  }
};
const boostrates = async (eventIds) => {
  try {
    const events = await BoostWork.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformBoostWork(event);
    });
  } catch (err) {
    throw err;
  }
};
const daysofCompletion = async (eventIds) => {
  try {
    const events = await DaysOfCompletion.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformDayOfCompletion(event);
    });
  } catch (err) {
    throw err;
  }
};
const sources = async (eventIds) => {
  try {
    const events = await Source.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformSource(event);
    });
  } catch (err) {
    throw err;
  }
};

const references = async (eventIds) => {
  try {
    const events = await ReferencingStyleType.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformReference(event);
    });
  } catch (err) {
    throw err;
  }
};
const ratings = async (eventIds) => {
  try {
    const events = await Ratings.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformRatings(event);
    });
  } catch (err) {
    throw err;
  }
};
const languages = async (eventIds) => {
  try {
    const events = await Language.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformLanguage(event);
    });
  } catch (err) {
    throw err;
  }
};
const expertlevels = async (eventIds) => {
  try {
    const events = await ExpertLevel.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformExpertLevel(event);
    });
  } catch (err) {
    throw err;
  }
};
const academiclevels = async (eventIds) => {
  try {
    const events = await AcademicLevel.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformAcademicLevel(event);
    });
  } catch (err) {
    throw err;
  }
};
const works = async (eventIds) => {
  try {
    const events = await Work.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformWork(event);
    });
  } catch (err) {
    throw err;
  }
};
const orders = async (eventIds) => {
  try {
    const events = await Order.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformOrder(event);
    });
  } catch (err) {
    throw err;
  }
};

const creatorUser = async (eventIds) => {
  try {
    const events = await UserAcc.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformuser(event);
    });
  } catch (err) {
    throw err;
  }
};

const useracc = async (userId) => {
  // console.log(userId.toString())
  try {
    const user = await useraccLoader.load(userId.toString());
    // console.log(user)
    return user;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

const singleSubject = async (eventId) => {
  try {
    const event = await subjectLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleSource = async (eventId) => {
  try {
    const event = await sourceLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleReference = async (eventId) => {
  try {
    const event = await referenceLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleRating = async (eventId) => {
  try {
    const event = await ratingLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleWord = async (eventId) => {
  try {
    const event = await wordLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleLanguage = async (eventId) => {
  try {
    const event = await langugageLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleExpertLevel = async (eventId) => {
  try {
    const event = await expertlevelLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleAcademicLevel = async (eventId) => {
  try {
    const event = await academiclevelLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const singleWork = async (eventId) => {
  try {
    const event = await workLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleDayOfCompletion = async (eventId) => {
  try {
    const event = await dayofCompletionLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleOrder = async (eventId) => {
  try {
    const event = await orderLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
const singleBoostRates = async (eventId) => {
  try {
    const event = await boostRatesLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const transformSubject = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformSource = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformService = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformReference = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformRatings = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformLanguage = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformWord = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformExpertLevel = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformAcademicLevel = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformDayOfCompletion = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformWork = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,

    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformOrder = (event) => {
  return {
    ...event._doc,
    work: singleWork.bind(this, event.work),
    academicLevel: singleAcademicLevel.bind(this, event.academicLevel),
    expertLevel: singleExpertLevel.bind(this, event.expertLevel),
    user: useracc.bind(this, event.user),
    referencingStyle: singleReference.bind(this, event.referencingStyle),
    subject: singleSubject.bind(this, event.subject),
    boostServices: boostrates.bind(this, event.boostServices),
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};

const transformuser = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};

const transformFaq = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformGuarantee = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformPriceRates = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};
const transformBoostWork = (event) => {
  // console.log( event.user);
  return {
    ...event._doc,
    createdAt: datetoString(event._doc.createdAt),
    updatedAt: datetoString(event._doc.updatedAt),
  };
};

exports.transformFaq = transformFaq;
exports.transformSubject = transformSubject;
exports.transformSource = transformSource;
exports.transformReference = transformReference;
exports.transformRatings = transformRatings;
exports.transformLanguage = transformLanguage;
exports.transformExpertLevel = transformExpertLevel;
exports.transformAcademicLevel = transformAcademicLevel;
exports.transformWork = transformWork;
exports.transformOrder = transformOrder;
exports.transformuser = transformuser;
exports.transformWord = transformWord;
exports.transformDayOfCompletion = transformDayOfCompletion;
exports.transformService = transformService;
exports.transformGuarantee = transformGuarantee;
exports.transformPriceRates = transformPriceRates;
exports.transformBoostWork = transformBoostWork;
