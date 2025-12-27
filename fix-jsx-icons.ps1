# PowerShell script to replace Icon-suffixed JSX usages with Hi-prefixed versions

$iconMappings = @{
    'ArrowLeftIcon' = 'HiArrowLeft'
    'EnvelopeIcon' = 'HiEnvelope'
    'PhoneIcon' = 'HiPhone'
    'BuildingOffice2Icon' = 'HiBuildingOffice2'
    'UserGroupIcon' = 'HiUserGroup'
    'CalendarIcon' = 'HiCalendar'
    'ChartBarSquareIcon' = 'HiChartBarSquare'
    'ShieldCheckIcon' = 'HiShieldCheck'
    'UserPlusIcon' = 'HiUserPlus'
    'PlusIcon' = 'HiPlus'
    'FileText' = 'HiDocumentText'
    'Clock' = 'HiClock'
    'AlertCircle' = 'HiExclamationCircle'
    'CheckCircle' = 'HiCheckCircle'
    'ChatBubbleBottomCenterTextIcon' = 'HiChatBubbleBottomCenterText'
}

# Target specific files with errors
$targetFiles = @(
    "app\(dashboard)\admin\users\[id]\page.tsx",
    "app\(dashboard)\admin\departments\[id]\page.tsx",
    "app\(dashboard)\employee\appraisal\page.tsx",
    "app\(dashboard)\admin\ai-features\page.tsx"
)

$filesModified = 0

foreach ($filePath in $targetFiles) {
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $originalContent = $content
        $modified = $false
        
        # Replace each icon name in JSX (but not in imports)
        foreach ($oldName in $iconMappings.Keys) {
            $newName = $iconMappings[$oldName]
            # Replace JSX usages like <IconName or {IconName
            $pattern = "(<|{\s*)$oldName(\s|>|className|\/)"
            if ($content -match $pattern) {
                $content = $content -replace $pattern, "`$1$newName`$2"
                $modified = $true
                Write-Host "  Replaced $oldName -> $newName" -ForegroundColor Yellow
            }
        }
        
        if ($modified) {
            Set-Content -Path $filePath -Value $content -NoNewline
            $filesModified++
            Write-Host "Updated: $filePath" -ForegroundColor Green
        }
    } else {
        Write-Host "File not found: $filePath" -ForegroundColor Red
    }
}

Write-Host "`nTotal files modified: $filesModified" -ForegroundColor Cyan
