import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  },
}, {
    timestamps: true
});

export const Task = mongoose.model('Task', TaskSchema);
