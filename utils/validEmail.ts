const validEmail = (email: string) => {
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return undefined;
};

export default validEmail;
