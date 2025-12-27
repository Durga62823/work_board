# PowerShell script to replace Icon-suffixed icon names with Hi-prefixed names
# This fixes the Next.js barrel optimization issue with react-icons

$iconMappings = @{
    'UserGroupIcon' = 'HiUserGroup'
    'BuildingOffice2Icon' = 'HiBuildingOffice2'
    'FolderIcon' = 'HiFolder'
    'ArrowTrendingUpIcon' = 'HiArrowTrendingUp'
    'ShieldCheckIcon' = 'HiShieldCheck'
    'Cog6ToothIcon' = 'HiCog6Tooth'
    'Squares2X2Icon' = 'HiSquares2X2'
    'SparklesIcon' = 'HiSparkles'
    'HomeIcon' = 'HiHome'
    'CheckCircleIcon' = 'HiCheckCircle'
    'ClockIcon' = 'HiClock'
    'FlagIcon' = 'HiFlag'
    'CalendarIcon' = 'HiCalendar'
    'DocumentTextIcon' = 'HiDocumentText'
    'PlusIcon' = 'HiPlus'
    'TrashIcon' = 'HiTrash'
    'PencilIcon' = 'HiPencil'
    'ArrowLeftIcon' = 'HiArrowLeft'
    'EnvelopeIcon' = 'HiEnvelope'
    'PhoneIcon' = 'HiPhone'
    'ChartBarSquareIcon' = 'HiChartBarSquare'
    'UserPlusIcon' = 'HiUserPlus'
    'CheckIcon' = 'HiCheck'
    'ChevronRightIcon' = 'HiChevronRight'
    'PencilSquareIcon' = 'HiPencilSquare'
    'XMarkIcon' = 'HiXMark'
    'EllipsisVerticalIcon' = 'HiEllipsisVertical'
    'ChatBubbleLeftRightIcon' = 'HiChatBubbleLeftRight'
    'ExclamationCircleIcon' = 'HiExclamationCircle'
    'ExclamationTriangleIcon' = 'HiExclamationTriangle'
    'StarIcon' = 'HiStar'
    'ChatBubbleLeftIcon' = 'HiChatBubbleLeft'
    'ClipboardDocumentListIcon' = 'HiClipboardDocumentList'
    'ArrowDownTrayIcon' = 'HiArrowDownTray'
    'ChevronDownIcon' = 'HiChevronDown'
    'ChevronUpIcon' = 'HiChevronUp'
    'EyeIcon' = 'HiEye'
    'EyeSlashIcon' = 'HiEyeSlash'
    'UserIcon' = 'HiUser'
    'ArrowRightOnRectangleIcon' = 'HiArrowRightOnRectangle'
    'MoonIcon' = 'HiMoon'
    'SunIcon' = 'HiSun'
    'ChartBarIcon' = 'HiChartBar'
    'ArrowUpRightIcon' = 'HiArrowUpRight'
    'ArrowTrendingDownIcon' = 'HiArrowTrendingDown'
    'GlobeAltIcon' = 'HiGlobeAlt'
    'ChatBubbleLeftRightIcon' = 'HiChatBubbleLeftRight'
    'TrophyIcon' = 'HiTrophy'
    'BoltIcon' = 'HiBolt'
    'KeyIcon' = 'HiKey'
}

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path . -Include *.ts,*.tsx -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\node_modules\\' -and
    $_.FullName -notmatch '\\.next\\' -and
    $_.FullName -notmatch '\\dist\\'
}

$filesModified = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $modified = $false
    
    # Replace each icon name
    foreach ($oldName in $iconMappings.Keys) {
        $newName = $iconMappings[$oldName]
        if ($content -match $oldName) {
            $content = $content -replace $oldName, $newName
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $filesModified++
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "`nTotal files modified: $filesModified" -ForegroundColor Cyan
