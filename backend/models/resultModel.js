import mongoose from 'mongoose';

const performanceEnum = ["Excellent", "Good", "Average", "Needs Work"];

const ResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    technology: {
      type: String,
      required: true,
      trim: true,
      enum: ["html", "css"]
    },
    level: {
      type: String,
      required: true,
      enum: ["basic", "intermediate", "advanced"]
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 0
    },
    correct: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    wrong: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    performance: {
      type: String,
      enum: performanceEnum,
      default: "Needs Work"
    }
  },
  { timestamps: true }
);

// ✅ Modern Mongoose pre-save (NO next())
ResultSchema.pre('save', function () {
  const total = Number(this.totalQuestions) || 0;
  const correct = Number(this.correct) || 0;

  // Calculate wrong if not provided
  if (!this.wrong && total >= correct) {
    this.wrong = total - correct;
  }

  // Calculate score
  this.score = total ? Math.round((correct / total) * 100) : 0;

  // Set performance
  if (this.score >= 85) this.performance = "Excellent";
  else if (this.score >= 65) this.performance = "Good";
  else if (this.score >= 45) this.performance = "Average";
  else this.performance = "Needs Work";
});

const Result =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;