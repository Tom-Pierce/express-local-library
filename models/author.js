const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  if (this.first_name && this.family_name) {
    return `${this.family_name} ${this.first_name}`;
  }

  return "";
});

AuthorSchema.virtual("url").get(function () {
  return `/catalogue/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  }
  if (this.date_of_birth) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - present`;
  } else return "";
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat("yyyy-MM-dd");
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat("yyyy-MM-dd");
});

module.exports = mongoose.model("Author", AuthorSchema);
