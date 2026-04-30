const nodemailer = require("nodemailer");
const {
  EVENT_NAME,
  EVENT_DATETIME,
  EVENT_VENUE,
  BANK_INFO,
  PRICES,
} = require("./event-config");

function transporter() {
  const user = process.env.GMAIL_ACCOUNT;
  const pass = process.env.GMAIL_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_ACCOUNT / GMAIL_PASSWORD not configured");
  }
  return nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });
}

function totalPrice(seats) {
  return seats.reduce((acc, s) => acc + (PRICES[s.area] ?? 0), 0);
}

function seatLines(seats) {
  return seats
    .map(
      (s) =>
        `<h4>${s.floor === 2 ? "二樓 " : ""}${s.area} 區 ${s.row} 排 ${s.col} 號</h4>`
    )
    .join("");
}

function bankInfoHtml() {
  return BANK_INFO.map((line) => `<p>${line}</p>`).join("");
}

function bookingMail({ to, username, seats, verifyToken, email }) {
  const base = process.env.VERIFY_BASE_URL || "https://www.ntumagic.club/verify";
  const verifyLink = `${base}?email=${encodeURIComponent(email)}&verifyToken=${verifyToken}`;
  return {
    from: process.env.GMAIL_ACCOUNT,
    to,
    cc: process.env.GMAIL_ACCOUNT,
    subject: `【${EVENT_NAME}】劃位通知`,
    html: `<h3>${username} 您好：</h3>
      <p>感謝您支持${EVENT_NAME}</p>
      <p>若您尚未驗證信箱，請點擊<a href="${verifyLink}">此驗證連結</a>（已驗證過可忽略）</p>
      <p>================================================</p>
      <p>您此次所劃的座位：</p>
      ${seatLines(seats)}
      <p>共 ${totalPrice(seats)} 元</p>
      <p>================================================</p>
      <p>【匯款資訊】</p>
      ${bankInfoHtml()}
      <p>================================================</p>
      <h3>【🎩${EVENT_NAME}🎩】</h3>
      <p>${EVENT_DATETIME}</p>
      <p>${EVENT_VENUE}</p>
      <p>${EVENT_NAME}期待您的蒞臨！</p>`,
  };
}

function paidMail({ to, username, seats }) {
  return {
    from: process.env.GMAIL_ACCOUNT,
    to,
    cc: process.env.GMAIL_ACCOUNT,
    subject: `【${EVENT_NAME}】付款成功通知信`,
    html: `<h3>${username} 您好：</h3>
      <p>恭喜您！您已成功付款！</p>
      <p>您的座位：</p>
      ${seatLines(seats)}
      <p>感謝您支持${EVENT_NAME}</p>
      <p>當日請出示此封信件領取實體門票</p>
      <p>預祝您有個愉快的夜晚！</p>
      <p>================================================</p>
      <h3>【🎩${EVENT_NAME}🎩】</h3>
      <p>${EVENT_DATETIME}</p>
      <p>${EVENT_VENUE}</p>
      <p>${EVENT_NAME}期待您的蒞臨！</p>`,
  };
}

async function sendMail(options) {
  const tx = transporter();
  return new Promise((resolve, reject) => {
    tx.sendMail(options, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
}

module.exports = { sendMail, bookingMail, paidMail, PRICES, totalPrice };
