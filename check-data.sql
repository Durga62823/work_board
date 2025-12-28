-- Check lead users and their teams
SELECT 
  u.email,
  u.role,
  u.name,
  t.name as team_name,
  t.id as team_id
FROM users u
LEFT JOIN teams t ON u."teamId" = t.id
WHERE u.role = 'LEAD';

-- Check projects associated with teams
SELECT 
  p.name as project_name,
  p.status,
  t.name as team_name,
  p."completionRate"
FROM projects p
JOIN teams t ON p."teamId" = t.id;

-- Check sprints for teams
SELECT 
  s.name as sprint_name,
  s.status,
  t.name as team_name,
  s."startDate",
  s."endDate"
FROM sprints s
LEFT JOIN teams t ON s."teamId" = t.id;

-- Check tasks
SELECT 
  COUNT(*) as task_count,
  tk.status,
  p.name as project_name,
  t.name as team_name
FROM tasks tk
LEFT JOIN projects p ON tk."projectId" = p.id
LEFT JOIN teams t ON p."teamId" = t.id
GROUP BY tk.status, p.name, t.name;

-- Check code reviews
SELECT 
  cr."prTitle",
  cr.status,
  u.name as author_name
FROM code_reviews cr
JOIN users u ON cr."authorId" = u.id;

-- Check technical metrics
SELECT 
  tm."metricType",
  tm.value,
  tm.unit,
  t.name as team_name
FROM technical_metrics tm
LEFT JOIN teams t ON tm."teamId" = t.id;
