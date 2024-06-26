import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [
      {
        userId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["invited", "member", "admin"],
          required: true,
        },
      },
    ],
  },
  playlists: {
    type: [
      {
        playlistId: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: true,
        },
        contributions: {
          type: [
            {
              userId: {
                type: String,
                required: true,
              },
              tracks: {
                type: [Schema.Types.Mixed],
                required: false,
              },
            },
          ],
          required: false,
        },
      },
    ],
    required: false,
  },
  setting: {
    type: {
      songsPerMember: {
        type: Number,
        required: false,
        default: 5,
      },
      enabled: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    required: false,
    default: {
      songsPerMember: 5,
      enabled: true,
    },
  },
});

const Group = mongoose.model("groups", GroupSchema);
export default Group;
