/**
 * Validates data models and objects through validation functions
 * mapped to specific model properties.
 *
 * @param {Object} validations Data model to validation
 *
 * @constructor
 *
 * @return {Validator}
 */
function Validator (validations) {
  this.errors = {};
  this.validations = typeof validations === 'function' ? validations() : validations;
}


/**
 * Returns length of error map
 *
 * @returns {Number}
 */
Validator.prototype.hasErrors = function () {
  return Object.keys(this.errors).length;
}


/**
 * Return the error message associated with the specified key
 * if has error or false
 *
 * @param {String} key
 * @returns {String|boolean}
 */
Validator.prototype.hasError = function (key) {
  return this.errors[key] || false;
};

/**
 * Return an array of unknown keys or false
 *
 * @returns {Array|boolean}
 */
Validator.prototype.hasUnknown = function () {
  return this.errors['unknown'] || false
};

/**
 * Validates the specified model against the validations mapping in this instance.
 *
 * Each (shallow) property is iterated over and cross-checked against the given model for value,
 * then the validation function is invoked passing the model as context and value as the first argument.
 *
 * On a truthy result from a validation function the result is placed on the error object with the
 * property name as the identifier.
 *
 * @param {Object} model Object or data model to validate values
 * @returns {Validator}
 */
Validator.prototype.validate = function (model) {

  var self = this;
  var model = typeof model === 'function' ? model() : model;
  var validationsKeys = Object.keys(this.validations);
  var modelKeys = Object.keys(model);

  this.errors = {};

  modelKeys.forEach(function (key) {

    if (validationsKeys.indexOf(key) === -1) {

      if (self.errors.hasOwnProperty(model)) {
        self.errors['unknown'].push(key);
      } else {
        self.errors['unknown'] = [key];
      }

    }

  });

  validationsKeys.forEach(function (key) {

    var validator = self.validations[key];
    var value = model[key] ? (typeof model[key] === 'function' ? model[key]() : model[key]) : undefined;
    var error = validator(value);

    if (error) {
      self.errors[key] = error;
    }

  });

  return self
};