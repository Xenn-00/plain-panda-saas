import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")

  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? "",
    process.env.STRIPE_WEBHOOK_SECRET ?? ""
  )

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    const { userId } = session.metadata ?? { userId: null }

    if (!userId) {
      return new Response("Invalid Metadata", { status: 400 })
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: "PRO",
      },
    })
  }

  return new Response("OK")
}