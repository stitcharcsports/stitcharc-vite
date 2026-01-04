import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { record } = await req.json(); // user record from Auth event

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabaseClient
      .from("profiles")
      .insert({
        id: record.id,
        email: record.email,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error inserting profile:", error);
      return new Response("Failed to insert profile", { status: 400 });
    }

    return new Response("Profile created successfully", { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
