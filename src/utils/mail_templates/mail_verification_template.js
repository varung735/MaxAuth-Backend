const mail_verification_template = function (name, link, otp) {

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            />
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fd5c63;
                    height: 90vh;
                }

                .main-container {
                    padding: 5%;
                    text-align: center;
                    border-radius: 10px;
                    background-color: #fff;
                }

                .heading {
                    font-family: "Roboto";
                    font-size: 1.6rem;
                    font-weight: 400;
                }

                .paragraph {
                    text-align: start;
                    font-family: "Open Sans";
                    font-size: 0.8rem;
                    font-weight: 400;
                }

                .otp {
                    margin-top: 4%;
                    margin-bottom: 4%;
                    font-size: 3rem;
                    letter-spacing: 1.2rem;
                }

                .button {
                    padding: 3% 6%;
                    border: none;
                    border-radius: 5px;
                    background-color: #e32636;
                    color: #fff;
                    cursor: pointer;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="main-container">
                <h1 class="heading">Thank You For Choosing Max Auth!</h1>
                <p class="paragraph">Hi ${name}!!</p>
                <p class="paragraph">
                    Click on the button below and enter the OTP to verify your email.
                </p>
                <p class="otp">${otp}</p>
                <a class="button" href=${link}>Verify Email</a>
            </div>
        </body>
        </html>
    `;
}

module.exports = mail_verification_template;