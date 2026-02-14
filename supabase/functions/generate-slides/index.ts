import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DAY_PROMPTS: Record<number, string> = {
  1: `You are a business coach creating personalized slide content for a coaching client.
The client has answered questions about their business goals, revenue targets, and motivations.

From their answers, extract and return a JSON object with EXACTLY this structure:
{
  "clientName": "First name of the client",
  "revenueGoal": "$XXX,XXX format",
  "revenueTimeframe": "e.g. 'in next 12 months'",
  "motivatingForce": "Their #1 motivating reason for hitting the goal (direct quote or close paraphrase)",
  "niche": "Their coaching/business niche (e.g. 'marriage coaching', 'fitness coaching')",
  "targetMarket": "Who their ideal clients are",
  "targetMarketSize": "Estimated total addressable market size",
  "targetMarketSegments": [
    { "name": "Segment name", "percentage": 80, "count": "X,XXX,XXX", "detail": "Description" },
    { "name": "Segment name", "percentage": 15, "count": "X,XXX,XXX", "detail": "Description" },
    { "name": "Segment name", "percentage": 4.5, "count": "XXX,XXX", "detail": "Description" },
    { "name": "Segment name", "percentage": 0.5, "count": "XX,XXX", "detail": "Description" }
  ],
  "pricePerClient": 10000,
  "clientsNeeded": 12,
  "funnelData": {
    "year": { "leads": "1,200", "conversations": "120", "clients": "12", "revenue": "$120,000" },
    "month": { "leads": "100", "conversations": "10", "clients": "1", "revenue": "$10,000" }
  },
  "bottomCallout": "A compelling one-liner about their market opportunity"
}

Make reasonable estimates for market data based on their niche. Keep the tone motivational and data-driven.
Return ONLY valid JSON, no markdown fences.`,

  2: `You are a business coach creating personalized slide content for a coaching client.
The client has answered questions about their target audience, media consumption, and offer structure.

From their answers, extract and return a JSON object with EXACTLY this structure:
{
  "clientName": "First name of the client",
  "niche": "Their coaching/business niche",
  "targetAudience": "Who their ideal clients are",
  "mediaChannels": [
    { "label": "Channel name (e.g. Read Newsletters)", "sublabel": "Frequency", "percent": 85, "stat": "X,XXX,XXX", "detail": "Why this channel matters" },
    { "label": "Channel name", "sublabel": "Frequency", "percent": 70, "stat": "X,XXX,XXX", "detail": "Why this channel matters" },
    { "label": "Channel name", "sublabel": "Frequency", "percent": 55, "stat": "X,XXX,XXX", "detail": "Why this channel matters" }
  ],
  "offerStructure": {
    "plan": { "headline": "Custom Plan Name", "bullets": ["bullet 1", "bullet 2", "bullet 3"] },
    "training": { "headline": "Training Component Name", "bullets": ["bullet 1", "bullet 2", "bullet 3"] },
    "access": { "headline": "Access Component Name", "bullets": ["bullet 1", "bullet 2", "bullet 3"] }
  },
  "offerPrice": "$10,000",
  "offerDuration": "6–12 months",
  "offerFooter": "A compelling one-liner about the offer value",
  "caseStudy": {
    "partnerName": "Name of a hypothetical or real partner",
    "partnerRole": "What they do",
    "audienceSize": "XX,XXX",
    "result": "What happened from the partnership",
    "quote": "A testimonial-style quote about the partnership"
  },
  "trainingPreview": {
    "steps": [
      { "title": "Step 1 title", "desc": "Step 1 description" },
      { "title": "Step 2 title", "desc": "Step 2 description" },
      { "title": "Step 3 title", "desc": "Step 3 description" }
    ]
  },
  "footerCallout": "A compelling statement about audience access"
}

Make reasonable estimates for media data based on their niche. Keep the tone motivational.
Return ONLY valid JSON, no markdown fences.`,

  3: `You are a business coach creating personalized slide content for a coaching client.
The client has answered questions about their revenue projections, ideal partnerships, and readiness to start.

From their answers, extract and return a JSON object with EXACTLY this structure:
{
  "clientName": "First name of the client",
  "niche": "Their coaching/business niche",
  "revenueGoal": 500000,
  "pricePerClient": 10000,
  "clientsPerThousand": 1,
  "revenueChart": {
    "weeklyClients": 1,
    "goalWeeks": 50
  },
  "idealPartner": {
    "name": "Name of ideal partner to match with",
    "role": "What they do (e.g. 'Email Marketing Expert')",
    "audienceSize": "XXX,XXX",
    "audienceType": "subscribers/followers/etc",
    "platform": "Newsletter/Podcast/YouTube",
    "matchReasons": ["reason 1", "reason 2", "reason 3", "reason 4"],
    "overlapScore": 94,
    "stats": [
      { "label": "Stat label", "value": "Stat value" },
      { "label": "Stat label", "value": "Stat value" },
      { "label": "Stat label", "value": "Stat value" },
      { "label": "Stat label", "value": "Stat value" }
    ]
  },
  "chartFooter": "A compelling statement about the revenue trajectory",
  "bonuses": [
    { "title": "Bonus 1 title", "worth": "$5,000", "description": "What the bonus includes" },
    { "title": "Bonus 2 title", "worth": "$5,000", "description": "What the bonus includes" }
  ]
}

Make reasonable estimates based on their niche. Keep the tone motivational and data-driven.
Return ONLY valid JSON, no markdown fences.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { day, answers } = await req.json();

    if (!day || !answers) {
      return new Response(
        JSON.stringify({ error: "Missing 'day' or 'answers' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = DAY_PROMPTS[day];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: `Invalid day: ${day}. Must be 1, 2, or 3.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Here are the client's answers for Day ${day}:\n\n${answers}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResult = await response.json();
    const content = aiResult.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No content returned from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON from the AI response
    let slideData;
    try {
      // Strip markdown fences if present
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      slideData = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI JSON:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ day, data: slideData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-slides error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
