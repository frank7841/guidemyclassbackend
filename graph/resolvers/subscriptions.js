const pubsub = require("./pubsub");
const { withFilter } = require("graphql-subscriptions");
// const NEW_USER = "NEW_USER";

const subscription = {
  // newusers: {
  //   subscribe: () => pubsub.asyncIterator(NEW_USER),
  // },
  // newblogpost: {
  //   subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
  // },
  // newstreamLists: {
  //   subscribe: () => pubsub.asyncIterator(["STREAM_CREATED"]),
  // },
  // newmessages: {
  //   subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"]),
  // },
  // newlike: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator(["LIKE_CREATED"]),
  //     (payload, variables) => {
  //       return payload.streamId === variables.streamId;
  //     }
  //   ),
  // },
  // addview: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator(["VIEW_CREATED"]),
  //     (payload, variables) => {
  //       return payload.streamId === variables.streamId;
  //     }
  //   ),
  // },
  // removeview: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator(["VIEW_REMOVED"]),
  //     (payload, variables) => {
  //       return payload.streamId === variables.streamId;
  //     }
  //   ),
  // },
  // deleteblogpost: {
  //   subscribe: () => pubsub.asyncIterator(["BLOG_DELETED"]),
  // },
  // deletesinglemessage: {
  //   subscribe: () => pubsub.asyncIterator(["MESSAGE_DELETED"]),
  // },
  // endstream: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator(["STREAM_DELETED"]),
  //     (payload, variables) => {
  //       return payload.streamId === variables.streamId;
  //     }
  //   ),
  // },
  // deletemessageList: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator(["MESSAGE_LIST_DELETED"]),
  //     (payload, variables) => {
  //       return payload.userCode === variables.userCode;
  //     }
  //   ),
  // },
  // newmessageList: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NEW_MESSAGE"),
  //     (payload, variables) => {
  //       return payload.newmessageList.user.user_code === variables.userCode;
  //     }
  //   ),
  // },
  // newcomment: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NEW_USER_EVENT"),
  //     (payload, variables) => {
  //       return payload.topicid === variables.topicId;
  //     }
  //   ),
  // },
  // newstreamcomment: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NEW_STREAM_COMMENT"),
  //     (payload, variables) => {
  //       return payload.streamid === variables.streamid;
  //     }
  //   ),
  // },
  // deletecomment: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NEW_DELETE_COMMENT"),
  //     (payload, variables) => {
  //       return payload.topicid === variables._id;
  //     }
  //   ),
  // },
  // notificationsubscription: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NewNotification"),
  //     (payload, variables) => {
  //       return payload.notificationsubscription.user === variables.userId;
  //     }
  //   ),
  // },
  // sortedMessageSubscription: {
  //   subscribe: withFilter(
  //     () => pubsub.asyncIterator("NewSortedMessage"),
  //     (payload, variables) => {
  //       // console.log(payload);
  //       return (
  //         (payload.sortedMessageSubscription.user.user_code ===
  //           variables.receiverCode &&
  //           payload.sortedMessageSubscription.creator.user_code ===
  //             variables.userCode) ||
  //         (payload.sortedMessageSubscription.user.user_code ===
  //           variables.userCode &&
  //           payload.sortedMessageSubscription.creator.user_code ===
  //             variables.receiverCode)
  //       );
  //     }
  //   ),
  // },
};
module.exports = subscription;
