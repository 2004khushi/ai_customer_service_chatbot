"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../packages/backend/convex/_generated/api"
import { Button } from "@workspace/ui/components/button";


export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>pikabu</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add</Button>
          <div className="max-w-sm w-full mx-auto ">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>

     <Unauthenticated>
       <p>must be signed in</p>
       <SignInButton>Sign IN!!</SignInButton>
     </Unauthenticated>
    </>
  )
}
