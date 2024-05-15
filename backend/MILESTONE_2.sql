create database Advising_Team_82
use Advising_Team_82
drop database Advising_Team_82

go
create procedure CreateAllTables 
as

     create table Advisor(
        advisor_id int primary key identity,
        name varchar(40),
        email varchar(40),
        office varchar(40),
        password varchar(40));

    create table Course(
        course_id int primary key identity,
        name varchar(40),
        major varchar(40),
        is_offered bit,
        credit_hours int,
        semester int );

    create table Instructor(
        instructor_id int primary key identity,
        name varchar(40),
        email varchar(40),
        faculty varchar(40),
        office varchar(40));

    create table Semester(
        semester_code varchar(40) primary key,
        start_date date,
        end_date date );

     create table Student(
        student_id int primary key identity,
        f_name varchar(40),
        l_name varchar(40),
        gpa decimal(3,2) check (gpa >=0.7 and gpa<=5),
        faculty varchar(40),
        email varchar(40),
        major varchar(40),
        password varchar(40),
        financial_status bit,
        semester int,
        acquired_hours int check (acquired_hours >=34 ),
        assigned_hours int check (assigned_hours <=34),
        advisor_id int,
        foreign key (advisor_id) references Advisor(advisor_id));

    create table Student_Phone(
        student_id int,
        phone_number varchar(40),
        primary key (student_id, phone_number) ,
        foreign key (student_id) references Student(student_id));


   create table PreqCourse_course(
        prerequisite_course_id int,
        course_id int,
        primary key (prerequisite_course_id , course_id ),
        foreign key (prerequisite_course_id) references Course(course_id)  ,
        foreign key (course_id) references Course(course_id) );

    create table Instructor_Course(
        course_id int,
        instructor_id int,
        primary key (course_id , instructor_id ) ,
        foreign key (course_id) references Course(course_id)  ,
        foreign key (instructor_id) references Instructor(instructor_id));
 
 
    create table Student_Instructor_Course_Take(
        student_id int,
        course_id int,
        instructor_id int,
        semester_code varchar(40),
        exam_type varchar(40) default 'Normal' ,
        grade varchar(40),
        primary key (student_id , course_id ,  semester_code),
        foreign key (student_id) references Student(student_id) ,
        foreign key (course_id) references Course(course_id)  ,
        foreign key (instructor_id) references Instructor(instructor_id));


    create table Course_Semester(
        course_id int,
        semester_code varchar(40),
        primary key ( course_id , semester_code ) ,
        foreign key (course_id) references Course(course_id) ,
        foreign key (semester_code) references Semester(semester_code));

    create table Slot(
        slot_id int primary key identity,
        day varchar(40),
        time varchar(40),
        location varchar(40),
        course_id int,
        instructor_id int,
        foreign key (course_id) references Course(course_id)   ,
        foreign key (instructor_id) references Instructor(instructor_id));

    
    create table Graduation_Plan(
        plan_id int identity,
        semester_code varchar(40),
        semester_credit_hours int,
        expected_grad_date date,
        advisor_id int,
        student_id int,
        primary key ( plan_id , semester_code ) ,
        foreign key (advisor_id) references Advisor(advisor_id) ,
        foreign key (student_id) references Student(student_id)  );
    
    create table GradPlan_Course(
        plan_id int,
        semester_code varchar(40),
        course_id int,
        primary key ( plan_id , semester_code , course_id ),
        foreign key (plan_id , semester_code) references Graduation_Plan(plan_id , semester_code));
        

    
    create table Request(
        request_id int primary key identity,
        type varchar(40),
        comment varchar(40),
        status varchar(40) default 'pending',
        credit_hours int,
        student_id int,
        advisor_id int,
        course_id int,
        foreign key (student_id) references Student(student_id)  ,
        foreign key (advisor_id) references Advisor(advisor_id)  ,
        foreign key (course_id) references Course(course_id)  );

    
    create table MakeUp_Exam(
        exam_id int primary key identity,
        date datetime,
        type varchar(40),
        course_id int,
        foreign key (course_id) references Course(course_id) );
 
 
    create table Exam_Student(
        exam_id int,
        student_id int,
        course_id int,
        primary key ( exam_id , student_id ),
        foreign key (exam_id) references MakeUp_Exam(exam_id)  ,
        foreign key (student_id) references Student(student_id) );

   
   create table Payment(
        payment_id int primary key identity,
        amount int,
        deadline datetime,
        n_installments int,
        status varchar(40) default 'notPaid' ,
        fund_percentage decimal(3,2),
        start_date datetime,
        student_id int,
        semester_code varchar(40),
        foreign key (student_id) references Student(student_id) ,
        foreign key (semester_code) references Semester(semester_code)  );

    
    create table Installment(
        payment_id int,
        deadline datetime,
        amount int,
        status varchar(40) default 'NotPaid',
        start_date datetime,
        primary key (payment_id , deadline ), 
        foreign key (payment_id) references Payment(payment_id) );

go

create procedure DropAllTables 
as
   drop table Student_Instructor_Course_Take 
   drop table Request
   drop table Slot
   drop table Course_Semester
   drop table GradPlan_Course
   drop table Graduation_Plan
   drop table Exam_Student
   drop table Installment
   drop table Payment
   drop table Instructor_Course
   drop table PreqCourse_course
   drop table Student_Phone
   drop table Student
   drop table MakeUp_Exam 
   drop table Course
   drop table Instructor
   drop table Semester
   drop table Advisor 

   
go

create procedure clearAllTables
as 
   delete from Student_Instructor_Course_Take 
   delete from Request
   delete from Slot
   delete from Installment
   delete from Course_Semester
   delete from GradPlan_Course
   delete from PreqCourse_course
   delete from Instructor_Course
   delete from Exam_Student
   delete from MakeUp_Exam
   delete from Payment
   delete from Graduation_Plan
   delete from Student_Phone
   delete from Course
   delete from Semester
   delete from Instructor
   delete from Student 
   delete from Advisor 

go

go 

create view view_Students
as
select s.student_id , s.f_name + ' ' + s.l_name as student_name , s.gpa , s.faculty , s.email , s.major , s.password , s.financial_status , s.semester , s.acquired_hours , s.assigned_hours , s.advisor_id
from Student s
where financial_status = 1

go

go

create view view_Course_prerequisites 
as
select c.course_id , c.name , c.major , c.is_offered ,c.credit_hours , c.semester , 
c2.course_id as prerequisite_course_id , c2.name as prerequisite_course_name
from Course c left outer join PreqCourse_course p ON c.course_id = p.course_id 
left outer join Course c2 ON  p.prerequisite_course_id = c2.course_id; 



go

create view Instructors_AssignedCourses 
as
select i.instructor_id , i.name as instructor_name , i.email , i.faculty , i.office ,
       c.course_id as course_id , c.name as course_name 
from Instructor i left outer join Instructor_Course ic ON i.instructor_id = ic.instructor_id
left outer join Course c ON ic.course_id = c.course_id;

go

create view Student_Payment 
as
select p.payment_id , p.amount , p.deadline , p.n_installments , p.status , p.fund_percentage , p.start_date , p.semester_code , 
s.student_id as student_id , s.f_name + ' ' + s.l_name as student_name
from Payment p left outer join Student s ON p.student_id = s.student_id;


go

create view Courses_Slots_Instructor 
as
select c.course_id as course_id, c.name as course_name , s.slot_id as slot_id , s.day as slot_day , s.time as slot_time, s.location as slot_location , i.name as instructor_name
from Course c left outer join Slot s ON c.course_id = s.course_id
left outer join Instructor i ON s.instructor_id = i.instructor_id;



go

create view  Courses_MakeupExams 
as
select c.course_id , c.name as course_name, cs.semester_code as course_semester, m.date ,  m.exam_id , m.type 
from Course c left outer join MakeUp_Exam m ON c.course_id = m.course_id
left outer join Course_Semester cs ON c.course_id = cs.course_id;



go

create view Students_Courses_transcript 
as
select s.student_id as student_id , s.f_name + '-' + s.l_name as student_name , 
c.course_id as course_id, c.name as course_name, sict.exam_type as exam_type , sict.grade as course_grade , sict.semester_code ,i.name as instructor_name
from Student s inner join Student_Instructor_Course_Take sict ON s.student_id = sict.student_id
inner join Course c ON sict.course_id = c.course_id
inner join Instructor i ON sict.instructor_id = i.instructor_id
where sict.grade is not null;

go

create view Semster_offered_Courses 
as
select c.course_id as course_id , c.name as course_name , s.semester_code as semester_code 
from Semester s left outer join Course_Semester cs ON  s.semester_code = cs.semester_code 
left outer join Course c ON cs.course_id = c.course_id;



go

create view Advisors_Graduation_Plan 
as
select g.plan_id , g.semester_code , g.semester_credit_hours , g.expected_grad_date , g.student_id , a.advisor_id as advisor_id , a.name  as advisor_name 
from Graduation_Plan g left outer join Advisor a ON g.advisor_id = a.advisor_id;

go

create procedure Procedures_StudentRegistration
@first_name varchar(40),
@last_name varchar(40),
@password varchar(40),
@faculty varchar(40) , 
@email varchar(40) , 
@major varchar(40) ,
@Semester int

as
insert into Student(f_name , l_name , faculty , email , major , password , financial_status , semester)
values(@first_name , @last_name ,  @faculty , @email , @major , @password ,  1 , @Semester )
select student_id
from Student 
where f_name = @first_name AND l_name = @last_name AND password = @password AND faculty = @faculty AND email = @email AND major = @major AND semester = @Semester;

go

create procedure Procedures_AdvisorRegistration
@advisor_name varchar(40)  ,
@password varchar(40)  ,
@email varchar(40)  , 
@office varchar(40)
as
insert into Advisor(name , email , office , password )
values(@advisor_name ,  @email ,  @office , @password )
select advisor_id
from Advisor 
where name = @advisor_name AND password = @password AND email = @email AND office = @office;

go

create procedure Procedures_AdminListStudents
as
select *
from Student;

go

create procedure Procedures_AdminListAdvisors
as
select *
from Advisor;

go

create procedure AdminListStudentsWithAdvisors
as
select s.student_id as student_id , s.f_name + ' ' + s.l_name as student_name , s.gpa , s.faculty , s.email , s.major , s.password , s.financial_status , 
s.semester , s.acquired_hours , s.assigned_hours ,
a.advisor_id as advisor_id , a.name as advisor_name
from Student s left outer join Advisor a ON s.advisor_id = a.advisor_id;


go

create procedure AdminAddingSemester
@start_date date ,
@end_date date ,
@semester_code varchar(40) 
as
insert into Semester (semester_code , start_date , end_date)
values (@semester_code ,@start_date, @end_date);

go

create procedure Procedures_AdminAddingCourse
@major varchar(40) ,
@semester int ,
@credit_hours int ,
@course_name varchar(40) ,
@offered bit 
as
insert into Course (name , major , is_offered , credit_hours , semester)
values ( @course_name , @major , @offered , @credit_hours , @semester);

go

create procedure Procedures_AdminLinkInstructor
@InstructorId int ,
@courseId int ,
@slotID int 
as
update Slot
set instructor_id = @InstructorId , course_id = @courseId
where slot_id = @slotID;



go

create procedure Procedures_AdminLinkStudent
@Instructor_Id int ,
@student_ID int,
@course_ID int ,
@semester_code varchar(40) 
as
insert into Student_Instructor_Course_Take (student_id, course_id, instructor_id, semester_code , exam_type , grade)
values (@student_ID, @course_ID, @Instructor_Id, @semester_code , 'Normal' , null);

go

create procedure Procedures_AdminLinkStudentToAdvisor
@studentID int,
@advisorID int 
as
update Student
set advisor_id = @advisorID
where student_id = @studentID;

go

create procedure Procedures_AdminAddExam 
@Type varchar(40) ,
@date datetime,
@courseID int  
as
insert into MakeUp_Exam( date , type , course_id) 
values ( @date , @Type , @courseID );

go

create procedure Procedures_AdminIssueInstallment
@payment_ID int 
as

    declare @numberofinstallments int ,  @paymentstartdate datetime    , @paymentdeadline datetime , @paymentamount int , 
            @installmentamount int    ,  @installmentstartdate datetime, @installmentdeadline datetime , @currentinstallment int;

    select @numberofinstallments = n_installments, @paymentstartdate = start_date, @paymentdeadline = deadline , @paymentamount = amount
    from Payment
    where payment_id = @payment_ID;
    
    set @installmentamount = @paymentamount / @numberofinstallments;
    
    set @installmentstartdate = @paymentstartdate;
    
    set @currentinstallment = 1;
    
    while @currentinstallment <= @numberofinstallments
    begin

        set @installmentdeadline = dateadd ( month , 1,  @installmentstartdate);
      
        insert into Installment ( payment_id , deadline , amount , status , start_date )
        values (@payment_ID, @installmentdeadline, @installmentamount, 'NotPaid', @installmentstartdate);

        set @installmentstartdate = @installmentdeadline;

        set @currentinstallment = @currentinstallment + 1;
    end
 
go

create procedure Procedures_AdminDeleteCourse
@courseID int
as
update Slot
set course_id = null , instructor_id = null
where course_id = @courseID

delete from Student_Instructor_Course_Take where course_id = @courseID
delete from Request where course_id = @courseID
delete from GradPlan_Course where course_id = @courseID
delete from PreqCourse_course where course_id = @courseID or prerequisite_course_id = @courseID
delete from Exam_Student where course_id = @courseID
delete from Course_Semester where course_id = @courseID
delete from MakeUp_Exam where course_id = @courseID
delete from Instructor_Course where course_id = @courseID
delete from Course where course_id = @courseID

go 

create function StudentStatusHelper 
(@student_id int)
returns bit
as 
begin 
declare @paymentID int , @installmentstatus varchar(40) , @installmentdeadline datetime , @currentDate datetime , @active bit ;

select @paymentID = payment_id
from Payment 
where student_id = @student_id;

set @currentDate = CURRENT_TIMESTAMP

if exists ( select * from Installment where payment_id = @paymentID and status = 'NotPaid' and deadline < @currentDate )
begin
set @active = 0
end
else
begin
set @active = 1
end

return @active

end

go

create procedure Procedure_AdminUpdateStudentStatus
@StudentID int 
as

if dbo.StudentStatusHelper(@StudentID)=1
begin

update Student
set financial_status = 1
where student_id = @StudentID;

end

else
begin

update Student
set financial_status = 0
where student_id = @StudentID;

end

go

create view all_Pending_Requests
as
select r.* , s.f_name + '-' + s.l_name as student_name , a.name as advisor_name
from Request r left outer join Student s ON r.student_id = s.student_id
left outer join Advisor a ON s.advisor_id = a.advisor_id
where r.status = 'pending';

go

create procedure Procedures_AdminDeleteSlots 
@current_semester varchar(40) 
as
update Slot 
set course_id = null , instructor_id = null
where course_id not in (select course_id
                        from Course_Semester 
                        where semester_code = @current_semester);

go

create function FN_AdvisorLogin
(@ID int , @password varchar(40)) 
returns bit
as
begin
declare @Success_bit bit;

if exists (select * from Advisor where advisor_id =  @ID and password = @password)
begin

set @Success_bit = 1;

end

else
begin

set @Success_bit = 0;

end

return @Success_bit

end;

go
 
create procedure Procedures_AdvisorCreateGP
@Semester_code varchar(40),
@expected_graduation_date date, 
@sem_credit_hours int,
@advisor_id int,
@student_id int
as

declare @acquired_hours int;

select @acquired_hours = acquired_hours
from Student
where student_id = @student_id;

if @acquired_hours > 157

begin

insert into Graduation_Plan( semester_code , semester_credit_hours , expected_grad_date , advisor_id , student_id) 
values (@Semester_code , @sem_credit_hours , @expected_graduation_date , @advisor_id , @student_id );

end

go

create procedure Procedures_AdvisorAddCourseGP 
@student_id int ,
@Semester_code varchar(40) ,
@course_name varchar(40) 
as
declare @course_id int , @planid int 

select @course_id = course_id 
from Course 
where name = @course_name;

select @planid = plan_id
from Graduation_Plan
where student_id = @student_id;

insert into GradPlan_Course
values ( @planid , @Semester_code , @course_id ) 

go

create procedure Procedures_AdvisorUpdateGP
@expected_grad_date date ,
@studentID int 
as

declare @planid int , @semestercode varchar(40) 

select @planid = plan_id , @semestercode = semester_code
from Graduation_Plan
where student_id = @studentID

update Graduation_Plan
set expected_grad_date = @expected_grad_date
where plan_id = @planid and semester_code = @semestercode;

go

create procedure Procedures_AdvisorDeleteFromGP 
@studentID int,
@semester_code varchar(40),
@course_ID int 
as 

declare @planid int

select @planid = plan_id
from Graduation_Plan
where student_id = @studentID


delete from GradPlan_Course
where plan_id = @planid and semester_code = @semester_code and course_id = @course_ID;

go 

create function FN_Advisors_Requests
(@advisorID int)
returns table
as
Return (
select *
from Request
where advisor_id = @advisorID);

go

create procedure Procedures_AdvisorApproveRejectCHRequest
@RequestID int ,
@Current_semester_code varchar(40) 
as
declare @type varchar(40) , 
        @student_id int , 
        @paymentid int ,
        @installmentamount int , 
        @installmentdeadline datetime ,
        @paymentamount int ,  
        @assignedhours int , 
        @gpa decimal(3,2) , 
        @credit_hours int , 
        @totalcredithours int ;

select @type = type
from Request 
where request_id = @RequestID;

if @type LIKE '&credit%' or @type LIKE '%hour%'

begin

select @student_id = student_id
from Request 
where request_id = @RequestID;

select @paymentid = payment_id , @paymentamount = amount 
from Payment 
where student_id = @student_id

select top 1 @installmentamount = i.amount , @installmentdeadline = i.deadline
from Installment i 
where i.status = 'NotPaid' and i.payment_id = @paymentid
order by i.deadline asc

select @assignedhours = assigned_hours 
from Student
where student_id =  @student_id;

select @gpa = gpa 
from Student 
where student_id = @student_id;

select @credit_hours = credit_hours 
from Request 
where request_id = @RequestID;

select @totalcredithours = SUM(c.credit_hours)
from Course c inner join Student_Instructor_Course_Take sict ON c.course_id = sict.course_id
where sict.student_id = @student_id and sict.semester_code = @Current_semester_code ;

if @gpa < 3.7 and  @totalcredithours + @credit_hours < 34 and @credit_hours <= 3
begin

update Request 
set status = 'approved'
where request_id = @RequestID;

update Student
set assigned_hours = @assignedhours + @credit_hours
where student_id =  @student_id;

update Installment
set amount = @installmentamount + @credit_hours*1000
where payment_id = @paymentid and  deadline = @installmentdeadline;

update Payment 
set amount = @paymentamount + @credit_hours*1000
where payment_id = @paymentid;

end

else
begin

update Request 
set status = 'rejected'
where request_id = @RequestID;

end

end


go

create procedure Procedures_AdvisorViewAssignedStudents
@AdvisorID int,
@major varchar(40) 
as
select s.student_id as student_id , s.f_name + '-' + s.l_name as student_name , s.major as student_major , c.name as course_name
from Student s left outer join Student_Instructor_Course_Take sict ON s.student_id = sict.student_id
left outer join Course c ON sict.course_id = c.course_id
where s.advisor_id = @AdvisorID and s.major = @major and sict.grade is not null and sict.grade is not null;

go


go

create procedure Procedures_AdvisorViewAllAssignedStudents
@AdvisorID int 
as
select s.student_id as student_id , s.f_name + '-' + s.l_name as student_name , s.major as student_major
from Student s
where s.advisor_id = @AdvisorID ;


go

create procedure Procedures_AdvisorApproveRejectCourseRequest 
@RequestID int ,
@current_semester_code varchar(40)
as
declare @type varchar(40) ,
        @course_id int    , @instructorid int , 
        @studentid int , 
        @credit_hours int , @assignedhours int ,
        @numberofpreqcourse int , @numberofpreqcoursetaken1 int  , @numberofpreqcoursetaken2 int;

select @type = type 
from Request
where request_id = @RequestID;

if @type LIKE '%course%' 

begin

select @course_id = course_id , @studentid = student_id
from Request 
where request_id = @RequestID;

select @instructorid = instructor_id 
from Instructor_Course
where course_id = @course_id;

select @credit_hours = credit_hours
from Course
where course_id = @course_id

select @assignedhours = assigned_hours 
from Student
where student_id = @studentID;

select @numberofpreqcourse = Count(prerequisite_course_id) 
from PreqCourse_course 
where course_id = @course_id;

select @numberofpreqcoursetaken1 = Count(distinct course_id)
from Student_Instructor_Course_Take 
where student_id = @studentID  and grade is not null AND course_id IN ( select prerequisite_course_id 
                                                                           from PreqCourse_course 
                                                                           where course_id = @course_id);


select @numberofpreqcoursetaken2 = Count(distinct course_id)
from Student_Instructor_Course_Take 
where student_id = @studentID  and grade <>'FA' AND course_id IN ( select prerequisite_course_id 
                                                                    from PreqCourse_course 
                                                                    where course_id = @course_id);

if @numberofpreqcourse != @numberofpreqcoursetaken1 or @numberofpreqcourse != @numberofpreqcoursetaken2 or @credit_hours >= @assignedhours
begin

update Request
set status = 'rejected'
where request_id = @RequestID;


end
else
begin

update Request
set status = 'approved'
where request_id = @RequestID;

insert into Student_Instructor_Course_Take 
values( @studentID , @course_id , @instructorid ,@current_semester_code , 'Normal'  , null);

update Student 
set assigned_hours = @assignedhours - @credit_hours
where student_id = @studentID;

end

end

go

create procedure Procedures_AdvisorViewPendingRequests
@AdvisorID int
as
select *
from Request
where status = 'pending' and advisor_id = @AdvisorID;

go

create function FN_StudentLogin
(@StudentID int , @password varchar(40)) 
returns bit
as
begin

declare @Success_bit bit;

if exists (select * from Student where student_id =  @StudentID and password = @password and financial_status = 1 ) 
   
begin

set @Success_bit = 1;

end

else
begin

set @Success_bit = 0;

end

return @Success_bit

end


go

create procedure Procedures_StudentaddMobile
@StudentID int,
@mobile_number varchar(40) 
as
insert into Student_Phone (student_id, phone_number)
values (@StudentID, @mobile_number);

go

create function FN_SemsterAvailableCourses
(@semster_code varchar(40))
returns table
as
Return (
select c.*
from Course c left outer join Course_Semester cs ON c.course_id = cs.course_id
where semester_code = @semster_code);

go

create procedure Procedures_StudentSendingCourseRequest 
@Student_ID int,
@course_ID int,
@type varchar(40),
@comment varchar(40)
as
declare @advisorid int

select @advisorid = advisor_id 
from Student
where student_id = @Student_ID; 

insert into Request( type , comment , status , student_id , advisor_id , course_id)
values(@type , @comment , 'pending' , @Student_ID , @advisorid , @course_ID );

go
 
create procedure Procedures_StudentSendingCHRequest
@Student_ID int,
@credit_hours int,
@type varchar(40),
@comment varchar(40)
as
declare @advisorid int

select @advisorid = advisor_id
from Student 
where student_id = @Student_ID;

insert into Request( type , comment , status , credit_hours , student_id , advisor_id) 
values(@type , @comment , 'pending' , @credit_hours , @Student_ID , @advisorid );

go

create function FN_StudentViewGP
(@student_ID int)
returns Table 
as
Return(
select s.student_id as student_id , s.f_name + '-' + s.l_name as student_name  , 
       g.plan_id as graduation_plan_id , c.course_id as course_id , c.name as course_name ,
       g.semester_code as semester_code , g.expected_grad_date as expected_graduation_date , g.semester_credit_hours as semester_credit_hours , g.advisor_id as advisor_id 
from Student s inner join Graduation_Plan g ON s.student_id = g.student_id 
left outer join GradPlan_Course gc ON g.plan_id = gc.plan_id and g.semester_code = gc.semester_code 
left outer join Course c ON gc.course_id = c.course_id
where s.student_id = @student_ID);

go

create function FN_StudentUpcoming_installment 
(@StudentID int)
returns datetime
as
begin 

declare @deadline datetime;

select top 1 @deadline = i.deadline
from Installment i inner join Payment p ON i.payment_id = p.payment_id
where p.student_id = @StudentID and i.status = 'NotPaid'
ORDER BY i.deadline ASC


return @deadline

end

go

create function FN_StudentViewSlot
(@CourseID int , @InstructorID int) 
returns table
as
Return (
select s.slot_id as slot_id , s.location as slot_location , s.time as slot_time , s.day as slot_day , c.name as course_name, c.course_id, i.name as instructor_name
from Slot s inner join Course c ON s.course_id = c.course_id
inner join Instructor i ON s.instructor_id = i.instructor_id 
where s.instructor_id = @InstructorID and s.course_id = @CourseID);

go
 
create procedure Procedures_StudentRegisterFirstMakeup 
@StudentID int ,
@courseID int ,
@studentCurrent_semester varchar(40) 
as
declare  @exam_id int ,  @instructorid int  , @firstmakeupbit bit 

if exists (select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and exam_type like '%Normal%' and (grade = 'F' or grade = 'FF' or grade = 'FA' or grade is null))
   and not exists (select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and exam_type like '%Normal&' and grade <> 'F' and grade <> 'FF' and grade <> 'FA' and grade is not null)
   and not exists ( select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and exam_type like '%First%')                              
   and not exists (select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and exam_type like '%Second%')

begin 
set @firstmakeupbit = 1;
end 

else 
begin 
set @firstmakeupbit = 0;
end

if @firstmakeupbit = 1
                                                                                      
begin

select @exam_id = exam_id
from MakeUp_Exam 
where course_id = @courseID and type like '%First%' and date > CURRENT_TIMESTAMP;

select @instructorid = instructor_id
from Instructor_Course
where course_id = @courseID ;

insert into Exam_Student(exam_id, student_id , course_id)
values(@exam_id , @StudentID , @courseID );

if exists ( select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and semester_code = @studentCurrent_semester)
begin

update Student_Instructor_Course_Take
set exam_type = 'First_makeup' , grade = null
where student_id = @StudentID and course_id = @courseID and semester_code = @studentCurrent_semester

end

else

begin

insert Student_Instructor_Course_Take(student_id , course_id , instructor_id , semester_code , exam_type , grade)
values(  @StudentID  ,  @courseID  ,  @instructorid  , @studentCurrent_semester , 'First_makeup' , null )

end

end

go

create function FN_StudentCheckSMEligiability 
(@CourseID int , @Student_ID int ) 
returns bit
as
begin

declare @Eligible_bit bit , @firstmakeup bit ,
        @odd bit , @numberoffailedcourses int 

if exists (select * from Student_Instructor_Course_Take where student_id =  @Student_ID and course_id = @CourseID and exam_type like '%First%' and (grade = 'F' or grade = 'FF' or grade = 'FA' ))
   and not exists (select * from Student_Instructor_Course_Take where student_id =  @Student_ID and  course_id = @CourseID and exam_type like '%First%' and grade <> 'F' and grade <> 'FF' and grade <> 'FA')
   and not exists (select * from Student_Instructor_Course_Take where student_id =  @Student_ID and  course_id = @CourseID and exam_type like '%Second%')
begin
set @firstmakeup = 1;
end
else
begin
set @firstmakeup = 0;
end

if exists ( select * from Student_Instructor_Course_Take where course_id = @CourseID and semester_code LIKE '%W%' and student_id = @Student_ID )
   or exists ( select * from Student_Instructor_Course_Take where course_id = @CourseID and semester_code LIKE '%R1%' and student_id = @Student_ID)
begin
set @odd = 1;
end

else

begin 
set @odd = 0;
end

if @odd = 1
begin

select @numberoffailedcourses = COUNT( distinct course_id )  
from Student_Instructor_Course_Take
where student_id = @Student_ID and (grade = 'F' or grade = 'FF' or grade = 'FA') and course_id not in(select course_id
                                                                                                      from Student_Instructor_Course_Take 
                                                                                                      where student_id = @Student_ID 
                                                                                                      and grade <> 'F' and grade <> 'FF' and grade <> 'FA' )
                                                                                                       and course_id in (select course_id
                                                                                                                    from Course_Semester
                                                                                                                    where semester_code LIKE '%W%' or semester_code LIKE '%R1%');
end

else
begin 

select @numberoffailedcourses = COUNT( distinct course_id )  
from Student_Instructor_Course_Take
where student_id = @Student_ID and (grade = 'F' or grade = 'FF' or grade = 'FA') and course_id not in(select course_id
                                                                                                      from Student_Instructor_Course_Take 
                                                                                                      where student_id = @Student_ID 
                                                                                                      and grade <> 'F' and grade <> 'FF' and grade <> 'FA' )
                                                                                                       and course_id in (select course_id
                                                                                                                    from Course_Semester
                                                                                                                    where semester_code LIKE 'S' or semester_code LIKE '%R2%');
end

if @numberoffailedcourses  <=2  and @firstmakeup = 1
begin

set @Eligible_bit = 1;

end

else
begin

set @Eligible_bit = 0;

end 

return @Eligible_bit;

end

go

create procedure Procedures_StudentRegisterSecondMakeup
@StudentID int,
@courseID int,
@Student_Current_Semester varchar(40)
as
declare @exam_id int , @instructorid int 

if dbo.FN_StudentCheckSMEligiability(@CourseID , @StudentID) = 1

begin

select @exam_id = exam_id
from MakeUp_Exam 
where course_id = @courseID and type like '%Second%' and date > CURRENT_TIMESTAMP;

select @instructorid = instructor_id
from Instructor_Course
where course_id = @courseID ;

insert into Exam_Student(exam_id, student_id , course_id)
values(@exam_id , @StudentID , @courseID );

if exists ( select * from Student_Instructor_Course_Take where student_id = @StudentID and course_id = @courseID and semester_code = @Student_Current_Semester)
begin

update Student_Instructor_Course_Take
set exam_type = 'Second_makeup' , grade = null
where student_id = @StudentID and course_id = @courseID and semester_code = @Student_Current_Semester

end

else
begin

insert Student_Instructor_Course_Take(student_id , course_id , instructor_id , semester_code , exam_type , grade)
values(  @StudentID  ,  @courseID  ,  @instructorid  , @Student_Current_Semester , 'Second_makeup' , null );

end
end 

go

create procedure Procedures_ViewRequiredCourses
@StudentID int,
@Current_semester_code varchar(40)
as
declare @start_date date , @currentsemester int 

    select @currentsemester = semester 
    from Student
    where student_id = @StudentID

    select @start_date = start_date
    from Semester 
    where semester_code = @Current_semester_code;

    select distinct c.*
    from Course c inner join Student_Instructor_Course_Take sict ON sict.course_id = c.course_id and sict.student_id = @StudentID and c.semester < @currentsemester
    where (not exists ( select * 
                       from Student_Instructor_Course_Take sict
                       where sict.student_id = @StudentID 
                              and sict.course_id = c.course_id 
                              and (sict.grade not in ('F', 'FF' , 'FA') or sict.grade is null))
          and exists (select * 
                      from Course_Semester cs 
                      where cs.course_id = c.course_id and cs.semester_code = @Current_semester_code));
     

                             
go

create procedure Procedures_ViewOptionalCourse
    @StudentID int,
    @Current_semester_code varchar(40)
as

    declare @end_date date;

    select @end_date = end_date
    from Semester 
    where semester_code = @Current_semester_code;

    select distinct c.* 
    from Course c left outer join Course_Semester cs ON c.course_id = cs.course_id
    where ( not exists ( select *
                         from PreqCourse_course pc left outer join Student_Instructor_Course_Take sict on pc.prerequisite_course_id = sict.course_id and sict.student_id = @StudentID
                         where pc.course_id = c.course_id and (sict.grade is null or sict.course_id is null or sict.grade = 'FA'))
           
           and not exists( select *
                           from Student_Instructor_Course_Take sict
                           where sict.student_id = @StudentID and sict.course_id = c.course_id)
          
          and (cs.semester_code = @Current_semester_code ))

    or (
        c.course_id not in( select pc.course_id
                             from PreqCourse_course pc )
        and not exists ( select *
                         from Student_Instructor_Course_Take sict
                         where sict.student_id = @StudentID and sict.course_id = c.course_id )

        and (cs.semester_code = @Current_semester_code  ));

go

create procedure Procedures_ViewMS 
@StudentID int
as

declare @major varchar(40)

select @major = major 
from Student
where student_id = @StudentID;

select distinct c.*
from Course c left outer join Student_Instructor_Course_Take sict ON c.course_id = sict.course_id and sict.student_id = @StudentID
where c.major = @major and not exists ( select * 
                                        from Student_Instructor_Course_Take sict
                                        where sict.student_id = @StudentID and sict.course_id = c.course_id and
                                        (sict.grade not in('FF' , 'F' , 'FA') or sict.grade is null))


go

create procedure Procedures_ChooseInstructor
@StudentID int,
@InstructorID int,
@CourseID int ,
@current_semester_code varchar(40)
as
update Student_Instructor_Course_Take
set instructor_id = @InstructorID
where student_id = @StudentID and course_id = @CourseID and semester_code = @current_semester_code;

go

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
exec CreateAllTables

exec DropAllTables


exec clearAllTables

insert into Advisor (name, email, office, password)
    values ('Tara hassan', 'tara.hassan@guc.edu.eg', 'B-201', 'password456'), ('ayman saleh', 'ayman.saleh@guc.edu.eg', 'B-202', 'password789');

insert into Student (f_name, l_name, gpa, faculty, email, major, password, financial_status, semester, acquired_hours, assigned_hours, advisor_id)
    values ('malak', 'ahmed', 3.5 , 'MET', 'malakahmed@guc', 'CS', 'password123', 1 , 3 , 159 , 10 , 1),
           ('layla', 'sayed', 3.6 , 'MET', 'laylasayed@guc', 'CS', 'password456', 1 , 3 , 186 , 10 , 1),
           ('salama', 'kholy', 3.8, 'MET', 'salamakholy@guc', 'CS', 'password789', 1 , 3 , 163 , 10 , 2),
           ('farah', 'basha', 2.2 , 'MET', 'farahbasha@guc', 'CS', 'password101112', 1 , 3 , 170 , 10 , 2),
           ('Khaled', 'mohamed', 3.7 , 'MET', 'khaledmohamed@guc', 'CS', 'password13141516', 1 , 3 , 159 , 10 , 2);

insert into Course (name, major, is_offered, credit_hours, semester)
     values ('Math1', 'CS' , 1, 8, 1),
            ('CS1'  , 'CS' , 1, 6, 1),
            ('PHY1' , 'CS' , 1, 6, 1),
            ('Prod' , 'CS' , 1, 4, 1),
            ('Chem' , 'CS' , 1, 4, 1),
      
            ('Math2', 'CS' , 0, 8, 2),
            ('CS2'  , 'CS' , 0, 6, 2),
            ('PHY2' , 'CS' , 0, 6, 2),
            ('Draw' , 'CS' , 0, 4, 2),
            ('DLD'  , 'CS' , 0, 4, 2),

            ('Math3', 'CS', 1, 8, 3),
            ('CS3'  , 'CS' ,1, 6, 3),
            ('PHY3' , 'CS' ,1, 6, 3),
            ('Circ1', 'CS' ,1, 4, 3),

            ('Math4' , 'CS', 0, 8, 4),
            ('CS4'   , 'CS', 0, 6, 4),
            ('Sig'   , 'CS', 0, 6, 4),
            ('Circ2' , 'CS', 0, 4, 4);

insert into PreqCourse_course(  prerequisite_course_id , course_id)
      values (1,6), (6,11), (11,15),
             (2,7), (7,12), (12,16),
             (3,8), (8,13),
             (14,18);

insert into Instructor (name, email, faculty, office)
    values ('Jane Smith', 'jane.smith@guc.edu.eg', 'MET', 'A-101'), ('Will Smith', 'will.smith@guc.edu.eg', 'MET', 'A-102');

insert into Instructor_Course( course_id , instructor_id )
    values ( 1 , 1),( 2 , 1),( 3 , 1),( 4 , 1),( 5 , 1),( 6 , 1),( 7 , 1),( 8 , 1),( 9 , 1),( 10 , 1),
           ( 11 , 2),( 12, 2),( 13, 2),( 14 , 2),( 15, 2),( 16, 2),( 17, 2),( 18, 2);
 
insert into Semester (semester_code, start_date, end_date)
    values ('W22', '2022-09-01', '2022-12-31'),('S22', '2023-01-20', '2023-06-20'),('W23', '2023-09-01', '2023-12-31'),('S23', '2024-01-20', '2024-06-20');

insert into Student_Instructor_Course_Take (student_id, course_id, instructor_id, semester_code, exam_type, grade)
    values (1,1,1,'W22', 'Normal', 'A'),(1,2,1, 'W22', 'Normal' , 'A' ),(1,3,1, 'W22', 'Normal' , 'F' ),(1,4,1, 'W22', 'Normal' , 'F' ),(1,5,1, 'W22', 'Normal' , 'F' ),
           (1,5,1,'S22', 'First_makeup' , 'FA' ),

           (1,6,1,'S22', 'Normal', 'D'),(1,7,1, 'S22', 'Normal' , 'FA' ),(1,8,1, 'S22', 'Normal' , 'B' ), (1,9,1, 'S22', 'Normal' , 'C' ),(1,10,1, 'S22', 'Normal' , 'B' ),

           (1,11,2,'W23', 'Normal', null),(1,13,2, 'W23', 'Normal' , null ),


           (2,1,1,'W22', 'Normal', 'A'),(2,2,1, 'W22', 'Normal' , 'C' ),(2,3,1, 'W22', 'Normal' , 'A' ),(2,4,1, 'W22', 'Normal' , 'F' ),(2,5,1, 'W22', 'Normal' , 'FF' ),
           (2,5,1,'S22', 'First_makeup' , 'FA' ),

           (2,6,1,'S22', 'Normal', 'D'),(2,7,1, 'S22', 'Normal' , 'C' ),(2,8,1, 'S22', 'Normal' , 'B' ),(2,9,1, 'S22', 'Normal' , 'FA' ),(2,10,1, 'S22', 'Normal' , 'F' ),

           (2,11,2,'W23', 'Normal', null),(2,12,2, 'W23', 'Normal' , null),(2,13,2, 'W23', 'Normal' , null ),(2,14,2, 'W23', 'Normal' , null ),


          (3,1,1,'W22', 'Normal', 'A'),(3,2,1, 'W22', 'Normal' , 'A' ),(3,3,1, 'W22', 'Normal' , 'A' ),(3,4,1, 'W22', 'Normal' , 'F' ),(3,5,1, 'W22', 'Normal' , 'FF' ),

          (3,6,1,'S22', 'Normal', 'D'),(3,7,1, 'S22', 'Normal' , 'C' ),(3,8,1, 'S22', 'Normal' , 'B' ),(3,9,1, 'S22', 'Normal' , 'C' ),(3,10,1, 'S22', 'Normal' , 'B' ),

          (3,13,2, 'W23', 'Normal' , null ),(3,14,2, 'W23', 'Normal' , null ),

         
          (4,1,1,'W22', 'Normal', 'A'),(4,2,1, 'W22', 'Normal' , 'A' ),(4,3,1, 'W22', 'Normal' , 'A' ),
     
          (4,6,1,'W22', 'Normal', 'D'),(4,7,1, 'W22', 'Normal' , 'C' ),(4,8,1, 'W23', 'Normal' , 'B' ),(4,9,1, 'W23', 'Normal' , 'C' ),(4,10,1, 'W23', 'Normal' , 'B' ),
         
          (4,4,1, 'W23', 'Normal' , 'C' ),(4,5,1, 'W23', 'Normal' , 'A' ),(4,11,2,'W23', 'Normal', 'A'),(4,12,2, 'W23', 'Normal' ,'A'),(4,13,2, 'W23', 'Normal' , 'A' ),
          (4,14,2, 'W23', 'Normal' , 'A' ),
         

          (5,1,1,'W22', 'Normal', 'A'),(5,2,1, 'W22', 'Normal' , 'A' ),(5,3,1, 'W22', 'Normal' , 'A' ),

          (5,6,1,'S22', 'Normal', 'D'),(5,7,1, 'S22', 'Normal' , 'C' ),(5,8,1, 'S22', 'Normal' , 'B' ),(5,9,1, 'S22', 'Normal' , 'C' ),(5,10,1, 'S22', 'Normal' , 'B' ),

          (5,4,1, 'W23', 'Normal' , 'C' ),(5,5,1, 'W23', 'Normal' , 'D' );

       
insert Course_Semester(course_id , semester_code)
   values(1,'W22'),(2,'W22'),(3,'W22'),(4,'W22'),(5,'W22'),

         (1,'W23'),(2,'W23'),(3,'W23'),(4,'W23'),(5,'W23'),

         (6, 'S22'),(7, 'S22'),(8, 'S22'),(9, 'S22'),(10, 'S22'),

         (6, 'S23'),(7, 'S23'),(8, 'S23'),(9, 'S23'),(10, 'S23'),

         (11,'W22'),(12,'W22'),(13,'W22'),(14,'W22'),(15,'W22'),

        (11 , 'W23'),(12 , 'W23'),(13 , 'W23'),(14 , 'W23'),

        (15, 'S22'),(16, 'S22'),(17, 'S22'),(18, 'S22'),
  
        (15, 'S23'),(16, 'S23'),(17, 'S23'),(18, 'S23');

      
insert into Slot (day, time, location, course_id, instructor_id)
    values 
           ('Mon', '10:00 AM', 'Room 101', 1, 1),
           ('Tue', '10:00 AM', 'Room 102', 2, 1),
           ('Wen', '10:00 AM', 'Room 103', 3, 1), 
           ('Thu', '10:00 AM', 'Room 104', 4, 1),
           ('Mon', '10:00 AM', 'Room 101', 5, 1),
           ('Tue', '10:00 AM', 'Room 102', 6, 1),
           ('Wen', '10:00 AM', 'Room 103', 7, 1), 
           ('Thu', '10:00 AM', 'Room 104', 8, 1),
           ('Mon', '10:00 AM', 'Room 101', 9, 1),
           ('Tue', '10:00 AM', 'Room 102', 10, 1),
           ('Wen', '10:00 AM', 'Room 103', 11, 2), 
           ('Thu', '10:00 AM', 'Room 104', 12, 1),
           ('Thu', '10:00 AM', 'Room 104', 13, 1),
           ('Mon', '10:00 AM', 'Room 101', 14, 2),
           ('Tue', '10:00 AM', 'Room 102', 15, 2),
           ('Wen', '10:00 AM', 'Room 103', 16, 2), 
           ('Thu', '10:00 AM', 'Room 104', 17, 2),
           ('Thu', '10:00 AM', 'Room 104', 18, 2);
          

    
insert into Graduation_Plan (semester_code, semester_credit_hours, expected_grad_date, advisor_id, student_id)
    values ('W23', 32 , '2023-06-01', 2, 1),
           ('W23', 30 , '2023-06-01', 2, 2),
           ('W23', 32 , '2023-06-01', 2, 3),
           ('W23', 30 , '2023-06-01', 2, 4);

insert into GradPlan_Course(plan_id,semester_code,course_id)
    values ( 1 , 'W23' , 17),
           ( 2 , 'W23' , 17),
           ( 3 , 'W23' , 17),
           ( 4 , 'W23' , 17);

  
insert into Request (type, comment, status , credit_hours, student_id, advisor_id, course_id)
    values ('course', 'add course.', 'pending' , 0 , 1 , 1 , 12), ('course', 'add course.', 'pending' , 0 , 3 , 2, 11), ('course', 'add course.', 'pending' , 0 , 3 , 2, 12),
           ('credit hours', 'credit hours.', 'pending' , 6 , 1 , 1 , 1),('credit hours', 'credit hours.', 'pending' , 3 , 4 , 1, 1), 
           ('credit hours', 'credit hours.', 'pending' , 3 , 3 , 1, 1), ('credit hours', 'credit hours.', 'pending' , 3 , 2 , 1, 1); 


insert into MakeUp_Exam (date, type, course_id)
    values ('2023-12-30 10:00 AM', 'First_makeup', 1),
           ('2022-12-30 10:00 AM', 'First_makeup', 2),
           ('2023-12-30 10:00 AM', 'First_makeup', 3),
           ('2022-12-30 10:00 AM', 'First_makeup', 4),
           ('2023-12-30 10:00 AM', 'Second_makeup', 5),
           ('2022-12-30 10:00 AM', 'First_makeup', 5),
            ('2023-12-30 10:00 AM', 'First_makeup', 6),
           ('2022-12-30 10:00 AM', 'First_makeup', 7),
           ('2023-12-30 10:00 AM', 'First_makeup', 8),
           ('2022-12-30 10:00 AM', 'First_makeup', 9),
           ('2022-12-30 10:00 AM', 'First_makeup', 10),
           ('2023-12-30 10:00 AM', 'First_makeup', 11),
           ('2022-12-30 10:00 AM', 'First_makeup', 12),
           ('2023-12-30 10:00 AM', 'First_makeup', 13),
           ('2022-12-30 10:00 AM', 'First_makeup', 12),
           ('2023-12-30 10:00 AM', 'First_makeup', 13),
           ('2022-12-30 10:00 AM', 'First_makeup', 14),
           ('2023-12-30 10:00 AM', 'First_makeup', 15),
           ('2022-12-30 10:00 AM' , 'First_makeup', 16),
           ('2023-12-30 10:00 AM', 'First_makeup', 17),
           ('2022-12-30 10:00 AM', 'First_makeup', 18);
      

insert into Exam_Student (exam_id, student_id, course_id)
    values (1, 5 , 5);

insert into Payment (amount, deadline, n_installments, status , fund_percentage, start_date, student_id, semester_code)
    values (1000000 , '2023-12-01 10:00 AM', 6 , 'Paid' , 0.5 , '2023-06-01 10:00 AM', 1 , 'W23'),
           (1000000 , '2023-12-01 10:00 AM', 6 , 'Paid' , 0.5 , '2023-06-01 10:00 AM', 2 , 'W23'),
           (1000000 , '2023-12-01 10:00 AM', 6 , 'Paid' , 0.5 , '2023-06-01 10:00 AM', 3 , 'W23'),
           (1000000 , '2023-12-01 10:00 AM', 6 , 'Paid' , 0.5 , '2023-06-01 10:00 AM', 4 , 'W23'),
           (1000000 , '2023-12-01 10:00 AM', 6 , 'NotPaid' , 0.5 , '2023-06-01 10:00 AM', 5 , 'W23');
        


select * from view_Students

select * from view_Course_prerequisites

select * from Instructors_AssignedCourses

select * from Student_Payment

select * from Courses_Slots_Instructor 

select * from Courses_MakeupExams

select * from Students_Courses_transcript

select * from Semster_offered_Courses

select * from Advisors_Graduation_Plan

 

declare  @Student_id int

exec Procedures_StudentRegistration 'salama' , 'kholy' , 'password789' , 'MET' , 'salamakholy@guc' , 'CS' , 3 , @Student_id OUTPUT

print @Student_id


declare  @Advisor_id int

exec Procedures_AdvisorRegistration '3atef' , 'password789' , 'ayman.saleh@guc.edu.eg' , 'B-202'
 print(@Advisor_id)




exec Procedures_AdminListStudents 


exec Procedures_AdminListAdvisors
 

exec AdminListStudentsWithAdvisors



exec AdminAddingSemester '2027-01-20' , '2027-06-20' , 'S27'




exec Procedures_AdminAddingCourse 'CS'  , 6 , 3 , 'theory'  , 1



exec Procedures_AdminLinkInstructor 1 , 15 , 4

 

exec Procedures_AdminLinkStudent 2 , 5 , 11 , 'W23'




exec Procedures_AdminLinkStudentToAdvisor 2 , 1



exec Procedures_AdminAddExam 'First_makeup' , '2023-11-30 11:00 AM' , 4



exec Procedures_AdminIssueInstallment 2


exec Procedures_AdminDeleteCourse 11



exec Procedure_AdminUpdateStudentStatus 2


select * from all_Pending_Requests


exec Procedures_AdminDeleteSlots 'W23'


declare @success bit

set @success = dbo.FN_AdvisorLogin(2 , 'password789' )



exec Procedures_AdvisorCreateGP 'W23' , '2023-06-01' , 32 , 1 , 1 





exec Procedures_AdvisorAddCourseGP 4 , 'W23' , 'Math1'





exec Procedures_AdvisorUpdateGP '2023-06-01' , 4





exec Procedures_AdvisorDeleteFromGP 5 , 'W23' , 11





select * from dbo.FN_Advisors_Requests(1)



exec Procedures_AdvisorApproveRejectCHRequest 4 , 'W23'





exec Procedures_AdvisorViewAssignedStudents 1 , 'CS'



exec Procedures_AdvisorApproveRejectCourseRequest 1 , 'W23'





exec Procedures_AdvisorViewPendingRequests 1



declare @success bit

set @success = dbo.FN_StudentLogin(2 , 'password456' )




exec Procedures_StudentaddMobile 2 , '01002261511'





select * from dbo.FN_SemsterAvailableCourses('S23')



exec Procedures_StudentSendingCourseRequest  1 , 13 , 'course' , 'add a course'





exec Procedures_StudentSendingCHRequest 1 , 3 , 'credit hours'  , 'add credit hours' 





select * from dbo.FN_StudentViewGP(5)



declare @deadline datetime

set @deadline = dbo.FN_StudentUpcoming_installment(2)





select * from dbo.FN_StudentViewSlot(11 , 2)



exec Procedures_StudentRegisterFirstMakeup 3 , 5 , 'W23'




declare @success int

set @success = dbo.FN_StudentCheckSMEligiability(5 , 2)




exec Procedures_StudentRegisterSecondMakeup  2 , 5  , 'W23'





exec Procedures_ViewRequiredCourses  1 , 'W23'
                                                                                         

exec Procedures_ViewOptionalCourse 3 , 'W23'


exec Procedures_ViewMS 5


exec Procedures_ChooseInstructor 3 , 2 , 14 , 'W23'

