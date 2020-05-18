// Determines if the user is likely using an ad block extension
export const checkAdBlocker = async () => {
  // Used to cache the result
  try {
    try {
      const response = await fetch(
          new Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
            method: 'HEAD',
            mode: 'no-cors',
          }));
      return false;
    } catch (error) {
      console.log(error);
      // Request failed, likely due to ad blocker
      return true;
    }
  } catch (error) {
    // fetch API error; possible fetch not supported (old browser)
    // Marking as a blocker since there was an error and so
    // we can prevent continued requests when this function is run
    console.log(error);
    return true;
  }
}
