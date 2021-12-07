import nodemailer from 'nodemailer'
export default async (req, res) => {
    const { name, email } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    })

    try {
        await transporter.sendMail({
            from: email,
            to: 'adaamr@gmail.com',
            subject: `Contact form submission from ${ name }`,
            html: `<div class="template-container">
      <h1 class="heading">Welcome to PenLabs!</h1>
      <h3 class="hello-name"><span class="wave">👋</span> Hello [name]</h3>
      <div class="email-content">
        <div class="intro-text">
          We are excited to have you with us at Smart Reportz. We are sending this email, a
          first in a (very small) series of emails, for a smooth onboarding
          experience that involves going through the company's philosophy,
          working guidelines, getting to know your manager and team, joining the
          communication platforms and workspaces, resources, and practical stuff
          like schedules and the work you will do.
          <br />
          <br />
          You will soon get an email from your product manager with all the
          information about your work and communication environments
          <br />
          For now, we would like you to read through our company philosophy,
          culture, code of conduct, and more technical things like project
          workflows and [code/design/project] style guides.
          <br />
          <br />
          Thanks for joining and have a good one!
        </div>
          `
        })
    } catch (err) {
        return err
    }

    res.status(200).json(req.body)
}
