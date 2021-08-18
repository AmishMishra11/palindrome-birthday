function reverseStr(str) {
  var listChar = str.split("");
  var reverseList = listChar.reverse();
  var reverseStr = listChar.join("");
  return reverseStr;
}

function checkPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function convertAllFormats(date) {
  var dateStr = convertToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  var listOfPalindromes = convertAllFormats(date);

  var check = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (checkPalindrome(listOfPalindromes[i])) {
      check = true;
      break;
    }
  }

  return check;
}

function leapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function increaseDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > noOfDaysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date) {
  var count = 0;
  var nextDate = increaseDate(date);
  while (1) {
    count++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = increaseDate(nextDate);
  }
  return [count, nextDate];
}

var dateInputRef = document.querySelector("#date-input");
var buttonCheckRef = document.querySelector("#check-button");
var messageRef = document.querySelector("#message");

function eventHandler() {
  var bdayDate = dateInputRef.value;
  if (bdayDate !== "") {
    var listOfDates = bdayDate.split("-");
    var date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0]),
    };
    var isPalindrome = checkPalindromeForAllFormats(date);
    if (isPalindrome) {
      messageRef.innerText = "Yay! Your Birthday is a Palindrome";
    } else {
      var [count, nextDate] = nextPalindromeDate(date);
      messageRef.innerText =
        "No, your birthday is not a palindrome. The next palindrome is " +
        nextDate.day +
        "-" +
        nextDate.month +
        "-" +
        nextDate.year +
        " , you missed it by " +
        count +
        " days";
    }
  }
}

buttonCheckRef.addEventListener("click", eventHandler);
