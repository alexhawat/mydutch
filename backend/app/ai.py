"""Cloudflare Workers AI service for Dutch conversation partner."""
import httpx
from typing import List, Dict, Optional

from app.config import settings


class CloudflareAI:
    """Service for interacting with Cloudflare Workers AI."""

    def __init__(self):
        """Initialize Cloudflare AI client."""
        self.account_id = settings.CF_ACCOUNT_ID
        self.api_token = settings.CF_API_TOKEN
        self.model = settings.CF_AI_MODEL
        self.base_url = f"https://api.cloudflare.com/client/v4/accounts/{self.account_id}/ai/run"

    async def chat(
        self,
        messages: List[Dict[str, str]],
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
    ) -> str:
        """
        Send a chat request to Cloudflare AI.

        Args:
            messages: List of message dicts with 'role' and 'content'
            system_prompt: Optional system prompt to set behavior
            temperature: Response randomness (0.0-1.0)

        Returns:
            AI response text
        """
        # Build messages with system prompt if provided
        full_messages = []
        if system_prompt:
            full_messages.append({"role": "system", "content": system_prompt})
        full_messages.extend(messages)

        # Prepare request
        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json",
        }

        payload = {
            "messages": full_messages,
            "temperature": temperature,
        }

        # Make request to Cloudflare AI
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/{self.model}",
                    json=payload,
                    headers=headers,
                    timeout=30.0,
                )

                if response.status_code == 200:
                    data = response.json()
                    # Extract response from Cloudflare AI response format
                    if "result" in data and "response" in data["result"]:
                        return data["result"]["response"]
                    elif "result" in data:
                        return str(data["result"])
                    return "Sorry, I couldn't generate a response."
                else:
                    print(f"Cloudflare AI error: {response.status_code} - {response.text}")
                    return "Sorry, I'm having trouble connecting right now."

            except httpx.TimeoutException:
                return "Sorry, the request timed out. Please try again."
            except Exception as e:
                print(f"Error calling Cloudflare AI: {e}")
                return "Sorry, an error occurred. Please try again."

    async def dutch_conversation(
        self,
        user_message: str,
        conversation_history: List[Dict[str, str]] = None,
        user_level: str = "A2",
    ) -> str:
        """
        Generate a Dutch conversation response with corrections.

        Args:
            user_message: User's message in Dutch
            conversation_history: Previous conversation messages
            user_level: User's Dutch level (A1, A2, B1, etc.)

        Returns:
            AI response in Dutch with corrections if needed
        """
        system_prompt = f"""You are a friendly Dutch language tutor helping a student practice conversation at {user_level} level.

Your responsibilities:
1. Respond naturally in Dutch to the student's messages
2. Keep your responses appropriate for {user_level} level learners
3. If the student makes mistakes, gently correct them after your response
4. Encourage the student and be patient
5. Use simple, clear Dutch

Format your responses like this:
[Your conversational response in Dutch]

[If there are mistakes, add:]
💡 Tip: [Explain the mistake and correction in English]

Example:
Student: "Ik heb gegaan naar de winkel gisteren"
You: "Oh leuk! Wat heb je gekocht in de winkel?

💡 Tip: In Dutch, we say 'Ik ben naar de winkel gegaan' (not 'heb gegaan'). The verb 'gaan' uses 'zijn' (ben/is) instead of 'hebben' in the perfect tense."
"""

        # Build message list
        messages = conversation_history or []
        messages.append({"role": "user", "content": user_message})

        return await self.chat(
            messages=messages,
            system_prompt=system_prompt,
            temperature=0.7,
        )

    async def grammar_explanation(self, topic: str, example: Optional[str] = None) -> str:
        """
        Get a grammar explanation in simple English.

        Args:
            topic: Grammar topic to explain
            example: Optional example sentence

        Returns:
            Grammar explanation
        """
        system_prompt = """You are a Dutch grammar expert. Explain Dutch grammar concepts clearly and simply for A2 level learners. Use examples and keep explanations concise."""

        user_message = f"Explain {topic} in Dutch grammar"
        if example:
            user_message += f" using this example: {example}"

        messages = [{"role": "user", "content": user_message}]

        return await self.chat(
            messages=messages,
            system_prompt=system_prompt,
            temperature=0.5,
        )


# Global AI service instance
ai_service = CloudflareAI()
