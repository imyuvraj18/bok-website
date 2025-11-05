import pool from './pool.js';

async function run() {
  const conn = await pool.getConnection();
  try {
    const courses = [
      // ICT courses for Grades 6–A/L
      ['ICT Fundamentals (Grade 6-8)', 'ICT', '6-8', 'Foundational ICT skills and digital literacy.', 12, 15000, 1],
      ['ICT Advanced (Grade 9-11)', 'ICT', '9-11', 'Applied ICT concepts, productivity tools, and projects.', 14, 18000, 1],
      ['ICT for A/L', 'ICT', 'A/L', 'Exam-focused theory and practicals for A/L ICT.', 16, 22000, 1],
      // Programming beginner tracks
      ['Programming with C (Beginner)', 'Programming', null, 'Intro to C programming basics and problem solving.', 10, 16000, 1],
      ['Programming with C# (Beginner)', 'Programming', null, 'Object-oriented basics with C# and .NET intro.', 10, 17000, 1],
      ['Programming with Java (Beginner)', 'Programming', null, 'Core Java syntax, OOP, and simple projects.', 10, 17000, 1],
      ['Programming with Python (Beginner)', 'Programming', null, 'Python fundamentals and scripting practices.', 10, 16000, 1],
      ['Web Dev with HTML & CSS', 'Programming', null, 'Modern HTML5 and CSS3 foundations.', 8, 14000, 1],
      ['JavaScript Basics', 'Programming', null, 'Core JS concepts and DOM manipulation.', 8, 15000, 1]
    ];

    await conn.query(
      `INSERT INTO courses (name, category, grade_range, description, duration_weeks, price_lkr, active)
       VALUES ?`,
      [courses]
    );
    console.log('Seeded courses.');
  } finally {
    conn.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});


