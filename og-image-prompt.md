# Open Graph Image Generation Prompt

Use this prompt with AI image generation tools (Midjourney, DALL-E, Stable Diffusion, etc.) to create a social sharing image for the Coffee Ratio Calculator.

## Image Specifications
- **Dimensions**: 1200px × 630px (Open Graph standard)
- **Format**: PNG or JPG
- **File size**: Under 1MB recommended

## Prompt

```
Create a clean, modern social media banner image (1200x630px) for a coffee ratio calculator web app. 

Design elements:
- Minimalist, professional aesthetic with a warm coffee shop vibe
- Color palette: warm stone/beige background (#fafaf9), rich coffee brown accents (#78350f, #451a03)
- Central focus: A stylized pour-over coffee setup or coffee beans with water droplets
- Include subtle ratio notation "1:16" or "1:15" integrated into the design
- Typography: Modern sans-serif font displaying "Coffee Ratio Calculator" as the main title
- Tagline below: "Perfect ratios for every brew method"
- Clean, uncluttered composition with plenty of breathing room
- Subtle texture or gradient to add depth without overwhelming
- Professional, app-like quality suitable for a web tool

Style: Clean, modern, minimalist, professional, warm, inviting
Mood: Precise, helpful, coffee-focused, artisanal
Avoid: Cluttered designs, too many elements, overly busy patterns, dark/moody aesthetics
```

## Alternative Simplified Prompt

```
Minimalist coffee ratio calculator banner, 1200x630px, warm beige background, coffee brown accents, pour-over coffee illustration, clean typography "Coffee Ratio Calculator", modern and professional, plenty of white space
```

## Design Tips

1. **Keep it simple**: The image should be recognizable even as a small thumbnail
2. **Readable text**: Ensure any text is large enough to read at smaller sizes
3. **Brand consistency**: Match the warm stone and coffee brown color palette of the app
4. **Focus on coffee**: Use coffee-related imagery (beans, pour-over, cups, steam)
5. **Professional quality**: This represents your app on social media

## Saving the Image

Once generated, save the image as:
- Filename: `og-image.png` or `og-image.jpg`
- Location: `/static/og-image.png` in the project directory
- Then update the meta tags in `src/routes/+page.svelte` to reference it

## Tools You Can Use

- **Midjourney**: Use the prompt in Discord
- **DALL-E**: Use via ChatGPT Plus or OpenAI API
- **Stable Diffusion**: Use via Stability AI or local installation
- **Canva**: Create manually using the specifications above
- **Figma**: Design from scratch with precise control
