const { pool } = require('./config/db');

async function seedAssessments() {
  console.log('[Seed] Seeding skill categories, skills, assessments, and questions...');
  try {
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');

    // 1. Skill Categories
    await pool.query(`
      INSERT INTO skill_categories (id, name, type, description) VALUES
      (1, 'Programming Languages', 'TECHNICAL', 'Core programming paradigms, syntax, and memory management'),
      (2, 'Core Computer Science', 'TECHNICAL', 'Data structures, algorithms, system design, and database principles'),
      (3, 'Web & Full Stack', 'TECHNICAL', 'Frontend frameworks, backend RESTful APIs, and UI architecture'),
      (4, 'Cloud & Infrastructure', 'TECHNICAL', 'DevOps, containerization, and public cloud deployments'),
      (5, 'Professional & Soft Skills', 'SOFT_SKILL', 'Interpersonal agility, teamwork, leadership, and communication')
      ON DUPLICATE KEY UPDATE name=VALUES(name)
    `);
    console.log('✔ Skill categories seeded');

    // 2. Skills
    await pool.query(`
      INSERT INTO skills (id, category_id, name, description, industry_demand_pct) VALUES
      (1, 1, 'Python', 'Versatile language for backend, scripting, and data science', 88),
      (2, 1, 'Java', 'Object-oriented language for robust enterprise backend systems', 76),
      (3, 2, 'SQL & Relational DBs', 'Database normalization, indexing, joins, and ACID transactions', 82),
      (4, 2, 'Data Structures & Algorithms', 'Arrays, linked lists, trees, graphs, sorting, and dynamic programming', 90),
      (5, 3, 'React.js', 'Declarative, component-based frontend web development library', 80),
      (6, 3, 'Node.js & Express', 'Asynchronous event-driven server runtime and REST APIs', 78),
      (7, 4, 'Cloud Computing (AWS/GCP)', 'Virtual machines, serverless, storage, and IAM security', 72),
      (8, 4, 'Docker & Containers', 'Containerization and multi-service development environments', 68),
      (9, 5, 'Professional Communication', 'Technical writing, client presentations, and stakeholder management', 85),
      (10, 5, 'Problem Solving & Critical Thinking', 'Analytical root-cause identification and algorithmic problem solving', 92),
      (11, 5, 'Teamwork & Collaboration', 'Git workflows, peer code reviews, and Agile sprints', 84)
      ON DUPLICATE KEY UPDATE name=VALUES(name)
    `);
    console.log('✔ Skills seeded');

    // 3. Assessments
    await pool.query(`
      INSERT INTO assessments (id, title, skill_id, category, difficulty, duration_minutes, passing_score, description) VALUES
      (1, 'Python Fundamentals & Data Structures', 1, 'TECHNICAL', 'INTERMEDIATE', 15, 60, 'Evaluate core Python paradigms, comprehensions, decorators, and OOP.'),
      (2, 'SQL Querying, Normalization & Joins', 3, 'TECHNICAL', 'INTERMEDIATE', 20, 65, 'Evaluate relational database schema design, complex joins, and aggregations.'),
      (3, 'Data Structures & Algorithmic Efficiency', 4, 'TECHNICAL', 'ADVANCED', 25, 70, 'Evaluate Big-O notation, tree traversals, and dynamic programming.'),
      (4, 'Modern React & Component State', 5, 'TECHNICAL', 'INTERMEDIATE', 15, 60, 'Evaluate React hooks, component lifecycle, virtual DOM, and performance.'),
      (5, 'Professional Workplace Communication', 9, 'SOFT_SKILL', 'INTERMEDIATE', 10, 60, 'Evaluate situational business communication, feedback, and conflict resolution.')
      ON DUPLICATE KEY UPDATE title=VALUES(title)
    `);
    console.log('✔ Assessments seeded');

    // 4. Questions
    await pool.query(`
      INSERT INTO assessment_questions (id, assessment_id, question_text, difficulty, explanation) VALUES
      (1, 1, 'What is the time complexity of searching a key in a Python dictionary on average?', 'BEGINNER', 'Python dictionaries are implemented using hash tables, offering O(1) average time complexity.'),
      (2, 1, 'Which of the following creates a shallow copy rather than a reference in Python?', 'INTERMEDIATE', 'list.copy() creates a shallow copy of the list.'),
      (3, 1, 'What does the @property decorator achieve in a Python class?', 'INTERMEDIATE', 'It defines a getter method that can be accessed like an attribute.'),
      (4, 2, 'Which clause is used to filter records resulting from a GROUP BY aggregation?', 'BEGINNER', 'HAVING filters grouped records, whereas WHERE filters before grouping.'),
      (5, 2, 'What ensures that a foreign key cannot reference a non-existent primary key in a related table?', 'INTERMEDIATE', 'Referential integrity constraint prevents orphan records.'),
      (6, 3, 'What is the worst-case time complexity of QuickSort?', 'INTERMEDIATE', 'QuickSort degenerates to O(n^2) when poor pivots are chosen.'),
      (7, 3, 'Which data structure is typically used to implement Breadth-First Search (BFS)?', 'BEGINNER', 'BFS uses a FIFO Queue.'),
      (8, 4, 'Which React Hook is primarily used for managing component side effects?', 'BEGINNER', 'useEffect is designed to perform subscriptions, timers, and data fetching.'),
      (9, 4, 'What is the purpose of React.memo?', 'INTERMEDIATE', 'React.memo skips re-rendering when props have not changed.'),
      (10, 5, 'What does the STAR technique stand for in behavioral interviews?', 'BEGINNER', 'STAR stands for Situation, Task, Action, and Result.')
      ON DUPLICATE KEY UPDATE question_text=VALUES(question_text)
    `);
    console.log('✔ Questions seeded');

    // 5. Options
    await pool.query(`
      INSERT INTO assessment_options (id, question_id, option_text, is_correct) VALUES
      (1, 1, 'O(1)', TRUE),
      (2, 1, 'O(n)', FALSE),
      (3, 1, 'O(log n)', FALSE),
      (4, 1, 'O(n log n)', FALSE),

      (5, 2, 'b = a.copy()', TRUE),
      (6, 2, 'b = a', FALSE),
      (7, 2, 'b = ref(a)', FALSE),
      (8, 2, 'b = a.clone()', FALSE),

      (9, 3, 'Allows method execution via attribute access syntax', TRUE),
      (10, 3, 'Makes a variable strictly private', FALSE),
      (11, 3, 'Converts instance methods into static functions', FALSE),
      (12, 3, 'Caches the return value of a method indefinitely', FALSE),

      (13, 4, 'HAVING', TRUE),
      (14, 4, 'WHERE', FALSE),
      (15, 4, 'ORDER BY', FALSE),
      (16, 4, 'LIMIT', FALSE),

      (17, 5, 'Referential Integrity', TRUE),
      (18, 5, 'Domain Integrity', FALSE),
      (19, 5, 'Entity Integrity', FALSE),
      (20, 5, 'User-defined Isolation', FALSE),

      (21, 6, 'O(n^2)', TRUE),
      (22, 6, 'O(n log n)', FALSE),
      (23, 6, 'O(n)', FALSE),
      (24, 6, 'O(log n)', FALSE),

      (25, 7, 'Queue (FIFO)', TRUE),
      (26, 7, 'Stack (LIFO)', FALSE),
      (27, 7, 'Priority Heap', FALSE),
      (28, 7, 'Binary Search Tree', FALSE),

      (29, 8, 'useEffect', TRUE),
      (30, 8, 'useState', FALSE),
      (31, 8, 'useContext', FALSE),
      (32, 8, 'useMemo', FALSE),

      (33, 9, 'Prevents unnecessary component re-renders if props are shallowly equal', TRUE),
      (34, 9, 'Persists state across browser page refreshes', FALSE),
      (35, 9, 'Manages global application state like Redux', FALSE),
      (36, 9, 'Automatically memoizes all functions inside the component', FALSE),

      (37, 10, 'Situation, Task, Action, Result', TRUE),
      (38, 10, 'Strategy, Target, Approach, Review', FALSE),
      (39, 10, 'Structure, Timeline, Architecture, Response', FALSE),
      (40, 10, 'Skill, Technicality, Assessment, Recommendation', FALSE)
      ON DUPLICATE KEY UPDATE option_text=VALUES(option_text)
    `);
    console.log('✔ Options seeded');

    // 6. Student Skills
    await pool.query(`
      INSERT INTO student_skills (student_id, skill_id, score, level) VALUES
      (1, 1, 85, 'ADVANCED'),
      (1, 3, 75, 'INTERMEDIATE'),
      (1, 5, 65, 'INTERMEDIATE'),
      (1, 4, 50, 'BEGINNER'),
      (1, 6, 78, 'INTERMEDIATE'),
      (1, 9, 70, 'INTERMEDIATE'),
      (1, 10, 72, 'INTERMEDIATE'),
      (1, 11, 85, 'ADVANCED')
      ON DUPLICATE KEY UPDATE score=VALUES(score)
    `);
    console.log('✔ Student skills seeded');

    await pool.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✔ All assessment seed operations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding assessments:', err);
    process.exit(1);
  }
}

seedAssessments();
