import pool from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Statuses an employer is allowed to set on an application
const ALLOWED_STATUSES = ['in-progress', 'shortlisted', 'contacted', 'rejected', 'selected', 'hired'];

export async function POST(request) {
  try {
    const session = getAuthUser(request);
    if (!session || session.role !== 'employer') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Employer login required.' }, { status: 401 }
      );
    }

    const { applicationId, status } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, message: 'Application ID and status are required' }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid application status.' }, { status: 400 });
    }

    // Verify the application belongs to a job owned by this employer before mutating it
    const [owned] = await pool.query(
      `SELECT ja.id
       FROM new_job_applications ja
       JOIN new_jobs j ON ja.job_id = j.id
       WHERE ja.id = ? AND j.employer_id = ?`, [applicationId, session.userId]
    );

    if (!owned || owned.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Application not found or you do not have permission to modify it.' }, { status: 404 }
      );
    }

    await pool.query(
      'UPDATE new_job_applications SET status = ? WHERE id = ?', [status, applicationId]
    );

    return NextResponse.json({ success: true, message: 'Candidate application status updated successfully!' });
  } catch (error) {
    console.error('Update application status error:', error);
    return NextResponse.json({ success: false, message: 'Server error during status update.' }, { status: 500 });
  }
}
