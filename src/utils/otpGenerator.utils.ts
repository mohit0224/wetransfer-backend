const otpGenerator = (len: number) => {
    const minValue = Math.pow(10, len - 1);
    const maxValue = Math.pow(10, len) - 1;

    const otp = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return otp;
};

export default otpGenerator;

