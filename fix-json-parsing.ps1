$content = Get-Content "lib\ai-service.ts" -Raw

# Replace the pattern
$pattern = '    const jsonMatch = response\.match\(/\\{\\[\\s\\S\]\*\\}\\/\);
    if \(jsonMatch\) \{
      return JSON\.parse\(jsonMatch\[0\]\);
    \}
    throw new Error\((''|")Failed to parse AI response(''|")\);'

$replacement = '    return this.parseJSONResponse(response);'

$content = $content -replace $pattern, $replacement

$content | Set-Content "lib\ai-service.ts" -NoNewline
