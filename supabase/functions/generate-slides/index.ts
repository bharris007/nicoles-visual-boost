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
  "motivatingForce": "Their #1 motivating reason for hitting the goal. MUST be 2-3 sentences minimum. Use their own words as much as possible, expanding into a compelling narrative.",
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
  "clientsNeeded": "CALCULATE: revenueGoal / 10000. e.g. $100,000 goal = 10 clients",
  "funnelData": {
    "year": {
      "leads": "CALCULATE: clientsNeeded × 100. Format with commas.",
      "conversations": "CALCULATE: clientsNeeded × 10. Format with commas.",
      "clients": "CALCULATE: revenueGoal / 10000. Just the number as string.",
      "revenue": "The revenue goal string e.g. $100,000"
    },
    "month": {
      "leads": "CALCULATE: yearly leads / 12, rounded. Format with commas.",
      "conversations": "CALCULATE: yearly conversations / 12, rounded.",
      "clients": "CALCULATE: yearly clients / 12, rounded to 1 decimal if needed.",
      "revenue": "CALCULATE: revenueGoal / 12, rounded. Format as $X,XXX."
    }
  },
  "bottomCallout": "A compelling one-liner about their market opportunity"
}

CRITICAL MATH RULES:
- Price per client is ALWAYS $10,000
- clientsNeeded = revenueGoal / 10,000
- Yearly leads = clientsNeeded × 100
- Yearly conversations = clientsNeeded × 10
- Monthly = yearly / 12

Make reasonable estimates for market data based on their niche. Keep the tone motivational and data-driven.
Return ONLY valid JSON, no markdown fences.`,

  2: `You are a business coach creating personalized slide content for a coaching client.
The client has answered questions about their target audience, media consumption, and offer structure.

STEP 1 — Parse the client's answers to identify:
- The CRISIS their ideal client is going through (1-3 words, e.g. "divorce", "burnout", "weight gain")
- The INDUSTRY/SOLUTION they operate in — merge crisis + solution into a phrase (e.g. crisis "divorce" → industry "marriage reconciliation", crisis "burnout" → industry "executive wellness")

STEP 2 — Using US Census Bureau stats or equivalent, estimate:
- How many people in the US are experiencing this crisis (total addressable market)
- Break that down by household income: All, $100K+, $200K+, $500K+
- Then estimate equivalents for UK, Canada, and Australia

STEP 3 — From their answers, extract and return a JSON object with EXACTLY this structure:
{
  "clientName": "First name of the client",
  "niche": "Their coaching/business niche",
  "crisis": "The 1-3 word crisis (e.g. 'divorce', 'burnout')",
  "industry": "The derived industry phrase (e.g. 'marriage reconciliation')",
  "targetAudience": "Who their ideal clients are",
  "marketData": {
    "totalUS": "Total people in crisis in US, formatted with commas (e.g. '12,100,000')",
    "incomeSegments": [
      { "name": "All (any income)", "percentage": 100, "count": "Same as totalUS formatted (e.g. '12,100,000')", "color": "hsl(160,30%,35%)" },
      { "name": "$100K+ Household", "percentage": "CALCULATE as % of total, integer", "count": "Actual count formatted with commas (e.g. '4,100,000')", "color": "hsl(145,50%,45%)" },
      { "name": "$200K+ Household", "percentage": "CALCULATE as % of total, integer", "count": "Actual count formatted with commas (e.g. '1,100,000')", "color": "hsl(45,95%,52%)" },
      { "name": "$500K+ Household", "percentage": "CALCULATE as % of total, integer", "count": "Actual count formatted with commas (e.g. '121,000')", "color": "hsl(25,100%,55%)" }
    ],
    "countries": {
      "all": {
        "US": "X,XXX,XXX", "UK": "X,XXX,XXX", "CA": "X,XXX,XXX", "AU": "X,XXX,XXX", "total": "XX,XXX,XXX"
      },
      "100k": {
        "US": "X,XXX,XXX", "UK": "XXX,XXX", "CA": "XXX,XXX", "AU": "XXX,XXX", "total": "X,XXX,XXX"
      },
      "200k": {
        "US": "XXX,XXX", "UK": "XXX,XXX", "CA": "XX,XXX", "AU": "XX,XXX", "total": "XXX,XXX"
      },
      "500k": {
        "US": "XX,XXX", "UK": "XX,XXX", "CA": "X,XXX", "AU": "X,XXX", "total": "XX,XXX"
      }
    },
    "subtitle": "A one-liner summary with the total market size, e.g. '12.1 million struggling marriages in the U.S. — broken down by household income.'",
    "bottomCallout": "A motivational one-liner mentioning the client name. Reference the exact $100K+ count (e.g. 'Over 1,156,000 high-earning people in crisis'). Say they only need a 'tiny fraction' of them. Do NOT mention specific client counts or price points. Example format: 'With over [100K+ count] high-earning [crisis people], [Name], you only need a tiny fraction to build a thriving practice.'",
    "additionalSource": "Name of a credible research source relevant to this specific crisis/niche (e.g. 'American Psychological Association' for divorce, 'National Institute of Mental Health' for burnout). NOT 'U.S. Census Bureau' — that is already included.",
    "sources": [
      { "title": "Article/paper headline from U.S. Census Bureau about household income data", "org": "U.S. Census Bureau", "url": "https://... direct URL to the census page or report" },
      { "title": "Article/paper headline from American Community Survey relevant to income brackets", "org": "American Community Survey", "url": "https://... direct URL" },
      { "title": "Article/paper headline from the niche-specific source about the crisis statistics", "org": "The additional source org name", "url": "https://... direct URL to article or study" }
    ]
  },
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

CRITICAL: Use realistic census-based estimates. The numbers should be believable and roughly accurate.
Make the incomeSegments percentages realistic (e.g. $100K+ is typically ~20-25% of US households, $200K+ ~5-7%, $500K+ ~0.5-1%).
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
