# AI Features Documentation

## Overview

The Admin panel includes powerful AI-powered features to enhance project management efficiency. These features are exclusive to administrators and require an AI API key to function.

## Setup

### 1. Get an AI API Key

You can use either:

#### Option A: Google Gemini (Free)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key

#### Option B: OpenAI (Paid)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key

### 2. Configure Environment Variable

Add your API key to the `.env` file:

```env
# For Gemini (Recommended - Free)
GEMINI_API_KEY="your-gemini-api-key-here"

# OR for OpenAI
OPENAI_API_KEY="your-openai-api-key-here"
```

### 3. Restart the Development Server

```bash
npm run dev
```

## Available AI Features

### 1. 🤖 AI Task Assistant

Break down complex tasks into actionable subtasks, estimate timelines, and generate comprehensive test cases.

**Use Cases:**
- **Task Breakdown**: "Build user authentication" → Get detailed subtasks with estimates
- **Timeline Estimation**: Get realistic timelines based on complexity and team size
- **Test Case Generation**: Automatically generate unit, integration, and e2e test cases

**How to Use:**
1. Navigate to Admin → AI Features
2. Select "AI Task Assistant"
3. Enter your task description
4. Choose the desired feature (Breakdown, Timeline, or Test Cases)

### 2. 🛡️ Smart Risk Assessment

Identify project risks, bottlenecks, and get AI-powered resource allocation suggestions.

**Features:**
- Risk scoring (1-10 scale)
- Bottleneck identification with severity levels
- Resource allocation recommendations
- Mitigation strategies

**How to Use:**
1. Navigate to Admin → AI Features
2. Select "Smart Risk Assessment"
3. Fill in project details (name, team size, progress, deadline)
4. Click "Assess Risk"

**Output:**
- Overall risk score and level
- Identified bottlenecks with impact analysis
- Resource suggestions with reasoning

### 3. 📄 Performance Review Assistant

Generate comprehensive, balanced performance reviews for team members based on their metrics.

**Input Data:**
- Employee name and role
- Projects completed
- Tasks completed
- On-time delivery percentage
- Achievements (optional)

**Output:**
- Overall score (1-10)
- Key strengths
- Areas for improvement
- Accomplishments summary
- Development recommendations
- Detailed review summary

**How to Use:**
1. Navigate to Admin → AI Features
2. Select "Performance Review Assistant"
3. Enter employee details and metrics
4. Click "Generate Review"

### 4. 💬 Meeting Summary Generator

Transform meeting transcripts into actionable summaries with key points, action items, and decisions.

**Features:**
- Executive summary
- Key discussion points
- Action items with assignees and deadlines
- Decisions made

**How to Use:**
1. Navigate to Admin → AI Features
2. Select "Meeting Summary Generator"
3. Paste meeting transcript or notes
4. Click "Generate Summary"

**Tips:**
- Include timestamps for better context
- Mention participant names for action item assignment
- Include any deadlines mentioned

### 5. 📅 Smart Sprint Planning

AI-assisted sprint planning with intelligent task allocation and capacity analysis.

**Features:**
- Sprint goal generation
- Capacity analysis (total, allocated, buffer)
- Optimal task allocation across team members
- Risk identification
- Sprint recommendations

**How to Use:**
1. Navigate to Admin → AI Features
2. Select "Smart Sprint Planning"
3. Set sprint duration
4. Add team members with their capacity (hours)
5. Add tasks with estimates and priorities
6. Click "Generate Sprint Plan"

**Output:**
- Clear sprint goal
- Capacity breakdown
- Task-to-member allocation
- Identified risks
- Strategic recommendations

## Best Practices

### Task Descriptions
- Be specific and detailed
- Include context and requirements
- Mention technical stack if relevant

### Risk Assessment
- Provide accurate task completion data
- Set realistic deadlines
- List known blockers

### Performance Reviews
- Use quantitative metrics when available
- Include specific achievements
- Be objective with the data

### Meeting Summaries
- Include speaker names for attribution
- Capture action items explicitly
- Note deadlines and deliverables

### Sprint Planning
- Set realistic capacity estimates
- Prioritize tasks correctly
- Account for meetings and overhead

## API Usage and Costs

### Gemini API (Recommended)
- **Free tier**: 60 requests per minute
- **Cost**: Free for moderate usage
- **Best for**: Most project management tasks

### OpenAI API
- **Cost**: Pay per token
- **Best for**: More complex reasoning tasks

## Troubleshooting

### "AI API key not configured" Error
- Ensure you've added the API key to `.env`
- Restart the development server
- Check for typos in the environment variable name

### "Failed to parse AI response" Error
- The AI response format was unexpected
- Try rephrasing your input
- Check your API quota/limits

### Slow Responses
- API calls may take 3-10 seconds
- Complex requests take longer
- Check your internet connection

### "Unauthorized. Admin access required"
- This feature is only available to admin users
- Ensure you're logged in as an admin

## Privacy and Security

- All AI API calls are made server-side
- No user data is stored by AI providers
- API keys are never exposed to the client
- Sensitive information should not be included in prompts

## Future Enhancements

Planned features:
- Code review assistant
- Automated documentation generation
- Predictive analytics for project timelines
- Team skill gap analysis
- Automated standup summaries

## Support

For issues or questions:
1. Check this documentation
2. Review error messages carefully
3. Verify API key configuration
4. Check API provider status pages
