
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth"


export default function SignIn() {

  return (
    <div className="p-10">
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <Button type="submit">
          Signin with Google
        </Button>
      </form >
    </div>
  )
} 
