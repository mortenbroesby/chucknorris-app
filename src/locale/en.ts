const locale = {
  validationErrors: {
    isEmptyUsername: "Usernames cannot be empty.",
    isEmptyPassword: "Passwords cannot be empty.",
    containsAlphabetSequence: "Passwords must include one increasing straight of at least three letters, like abc, cde, fgh,and so on, up to xyz. They cannot skip letters; acd doesn't count.",
    containsBlacklistedCharacters: "Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing.",
    containsOverlappingPairs: "Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.",
    isAboveMaxLength: "Passwords cannot be longer than 32 characters.",
    hasUppercase: "Passwords can only contain lower case characters.",
    containsOnlyLetters: "Passwords can only contain alphabetic characters.",
  }
};

export default locale;
