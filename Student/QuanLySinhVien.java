package Student;

import java.util.ArrayList;
import java.util.Scanner;

public class QuanLySinhVien {

    ArrayList<Student> listStudent;

    public QuanLySinhVien() {

    }

    public QuanLySinhVien(ArrayList<Student> listStudent) {
        this.listStudent = listStudent;
    }

    // 1. Xuất danh sách sinh viên
    public void getAllStudent() {
        if (listStudent.isEmpty()) {
            System.out.println("Danh sách sinh viên trống!");
            return;
        }
        for (Student student : listStudent) {
            System.out.println(student);
        }
    }

    // 2. Lấy sinh viên theo tên, id.
    public ArrayList<Student> getStudentByNameOrId(String name, int id) {
        ArrayList<Student> searchStudents = new ArrayList<>();
        for (Student student : listStudent) {
            if (student.getName().equalsIgnoreCase(name) || student.getId() == id) {
                searchStudents.add(student);
            }
        }
        return searchStudents;
    }


    // 3. Thêm sinh viên.
    public void addStudent(Student sv) {
        this.listStudent.add(sv);
    }

    public Student getStudentById(int id) {
        for (Student student : listStudent) {
            if (student.getId() == id) {
                return student;
            }
        }
        return null;
    }

    // 4. Sửa thông tin sinh viên theo id
    public void updateStudentById(int id) {
        Student student = getStudentById(id);
        if (student == null) {
            System.out.println("Sinh viên không tồn tại");
            return;
        }

        Scanner s = new Scanner(System.in);
        System.out.print("Nhập tên mới: ");
        student.setName(s.next());
        System.out.print("Nhập tuổi mới: ");
        student.setAge(s.nextInt());
        System.out.print("Nhập lớp mới: ");
        student.setLop(s.next());
        System.out.print("Nhập ngày sinh mới: ");
        student.setDayOfBirth(s.next());
        System.out.println("Cập nhật thành công!");
    }

    // 5. Xóa sinh viên theo id
    public void removeStudentById(int id) {
        Student student = getStudentById(id);
        if (student == null) {
            System.out.println("Sinh viên không tồn tại");
            return;
        }
        listStudent.remove(student);
        System.out.println("Xóa sinh viên thành công");
    }

}
