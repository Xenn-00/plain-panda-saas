"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

export const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordId.$post({ discordId })
      return await res.json()
    },
  })

  return (
    <Card className="w-full max-w-xl space-y-4">
      <div>
        <Label>Discord ID</Label>
        <Input
          className="mt-1 text-gray-700"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="enter your Discord ID"
        />
      </div>
      <p className="mt-2 text-sm/6 text-gray-600">
        Don't know how to find your discord ID?{" "}
        <Link
          href={
            "https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
          }
          className="text-brand-600 hover:text-brand-500"
        >
          Learn to obtain it here
        </Link>
        .
      </p>

      <div className="pt-4">
        <Button onClick={() => mutate(discordId)} disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  )
}
