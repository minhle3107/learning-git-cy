package Student;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        ArrayList<Student> listStudent = new ArrayList<>();
        QuanLySinhVien qlsv = new QuanLySinhVien(listStudent);

        Scanner s = new Scanner(System.in);

        int luaChon;

        do {
            System.out.println("1. Lấy danh sách sinh viên");
            System.out.println("2. Lấy sinh viên theo tên, id");
            System.out.println("3. Thêm sinh viên");
            System.out.println("4. Sửa thông tin sinh viên theo id");
            System.out.println("5. Xóa sinh viên theo id");
            System.out.println("0. Thoát!");
            System.out.print("Lựa chọn 1 trong các chức năng trên: ");
            luaChon = s.nextInt();

            switch (luaChon) {
                case 1:
                    System.out.println("1. Lấy danh sách sinh viên");
                    qlsv.getAllStudent();
                    break;
                case 2:
                    System.out.println("2. Lấy sinh viên theo tên, id");
                    System.out.print("Nhập vào tên: ");
                    String hoTenTimKiem = s.next();
                    System.out.print("Nhập vào tên: ");
                    int idTimKiem = s.nextInt();

                    ArrayList<Student> studentsSearch = qlsv.getStudentByNameOrId(hoTenTimKiem, idTimKiem);
                    if (!studentsSearch.isEmpty()) {
                        studentsSearch.forEach(System.out::println);
                    } else {
                        System.out.println("Không tìm thấy sinh viên");
                    }
                    break;
                case 3:
                    System.out.println("3. Thêm sinh viên");
                    System.out.print("Nhập vào họ và tên sinh viên: ");
                    String hoTenSv = s.next();
                    System.out.print("Nhập vào id sinh viên: ");
                    int idSv = s.nextInt();
                    System.out.print("Nhập vào lớp sinh viên: ");
                    String lopSv = s.next();
                    System.out.print("Nhập vào tuổi sinh viên: ");
                    int tuoiSv = s.nextInt();
                    System.out.print("Nhập vào ngày tháng năm sinh của sinh viên: ");
                    String dayOfBirthSv = s.next();
                    Student newStudent = new Student(hoTenSv, idSv, lopSv, tuoiSv, dayOfBirthSv);
                    qlsv.addStudent(newStudent);
                    break;
                case 4:
                    System.out.println("4. Sửa thông tin sinh viên theo id");
                    System.out.print("Nhập vào id sinh viên: ");
                    int idSvSua = s.nextInt();
                    qlsv.updateStudentById(idSvSua);
                    break;
                case 5:
                    System.out.println("5. Xóa sinh viên theo id");
                    System.out.print("Nhập vào id sinh viên cần xóa: ");
                    int idSVXoa = s.nextInt();
                    qlsv.removeStudentById(idSVXoa);
                    break;
                case 0:
                    System.out.println("Hẹn gặp lại!");
                default:
            }


        } while (luaChon != 0);
    }
}
