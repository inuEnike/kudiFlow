export const otpEmailTemplate = (otp: string, appName = "Your App") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${appName} OTP Verification</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f5; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <table 
          width="100%" 
          max-width="600px"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width:600px;
            background:#ffffff;
            border-radius:12px;
            padding:40px;
          "
        >

          <tr>
            <td align="center">
              <h1 style="
                margin:0;
                color:#111827;
                font-size:28px;
              ">
                ${appName}
              </h1>
            </td>
          </tr>


          <tr>
            <td>
              <p style="
                color:#374151;
                font-size:16px;
                line-height:24px;
                margin-top:30px;
              ">
                Hello,
              </p>

              <p style="
                color:#374151;
                font-size:16px;
                line-height:24px;
              ">
                Use the verification code below to complete your login.
                This code will expire shortly.
              </p>
            </td>
          </tr>


          <tr>
            <td align="center">

              <div style="
                margin:30px 0;
                padding:18px 30px;
                background:#f3f4f6;
                border-radius:10px;
                display:inline-block;
              ">
                <span style="
                  font-size:36px;
                  font-weight:bold;
                  letter-spacing:10px;
                  color:#111827;
                ">
                  ${otp}
                </span>
              </div>

            </td>
          </tr>


          <tr>
            <td>

              <p style="
                color:#6b7280;
                font-size:14px;
                line-height:20px;
              ">
                If you did not request this code, you can safely ignore this email.
              </p>

            </td>
          </tr>


          <tr>
            <td align="center">

              <p style="
                margin-top:40px;
                color:#9ca3af;
                font-size:12px;
              ">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>

            </td>
          </tr>


        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
