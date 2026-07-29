export const welcomeEmail = (
  full_name: string,
  company_name: string,
  dashboard_url: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome ${full_name}</title>
</head>
<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f7;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    style="padding: 40px 20px;"
  >
    <tr>
      <td align="center">
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="600"
          style="
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          "
        >
          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background: #2563eb;
                padding: 30px;
                color: #ffffff;
              "
            >
              <h1 style="margin:0;">🎉 Welcome to ${company_name}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin-top:0;color:#111827;">
                Hi ${full_name},
              </h2>

              <p
                style="
                  color:#4b5563;
                  line-height:1.7;
                  font-size:16px;
                "
              >
                Thank you for signing up! Your account has been created
                successfully.
              </p>

              <p
                style="
                  color:#4b5563;
                  line-height:1.7;
                  font-size:16px;
                "
              >
                We're excited to have you onboard. You can now start exploring
                all the features available on our platform.
              </p>

              <div style="text-align:center;margin:40px 0;">
                <a
                  href="${dashboard_url}"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 30px;
                    border-radius:6px;
                    display:inline-block;
                    font-weight:bold;
                  "
                >
                  Go to Dashboard
                </a>
              </div>

              <p
                style="
                  color:#6b7280;
                  line-height:1.7;
                  font-size:15px;
                "
              >
                If you have any questions, simply reply to this email — we're
                always happy to help.
              </p>

              <p
                style="
                  color:#111827;
                  margin-top:40px;
                "
              >
                Cheers,<br />
                <strong>${company_name} Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding:20px;
                background:#f9fafb;
                color:#9ca3af;
                font-size:13px;
              "
            >
              © 2026 ${company_name}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
