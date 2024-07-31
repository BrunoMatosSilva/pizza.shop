import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { authLinks } from '@/db/schema'
import { createId } from '@paralleldrive/cuid2'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { AuthenticationMagicLinkTemplate } from '@/mail/templates/authentication-magic-link'
import { env } from '@/env'
import { UnauthorizedError } from './errors/unauthorized-error'
import { transporter } from '@/mail/server'

export const sendAuthenticationLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new UnauthorizedError()
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      React.createElement(AuthenticationMagicLinkTemplate, {
        userEmail: email,
        authLink: authLink.toString(),
      }),
    )

    const mailOptions = {
      from: 'Pizza Shop <onboarding@example.com>',
      to: email,
      subject: '[Pizza Shop] Link para login',
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
