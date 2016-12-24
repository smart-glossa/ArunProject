package com.smartglossa.arun;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class BillServlets extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        doPost(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject bill = new JSONObject();
        String url = "jdbc:mysql://" + BillConstant.MYSQL_SERVER + "/" + BillConstant.DATABASE_NAME;
        String operation = request.getParameter("operation");

        if (operation.equals("add")) {
            int billno = Integer.parseInt(request.getParameter("billno"));
            int salesamt = Integer.parseInt(request.getParameter("sales"));
            int paid = Integer.parseInt(request.getParameter("paid"));
            int prple = Integer.parseInt(request.getParameter("principle"));
            String date = request.getParameter("date");
            int credit = 0;
            credit = salesamt - paid;
            int shortt = 0;
            int ex = 0;
            int tot = 0;
            if (prple > paid) {
                shortt = prple - paid;
            } else {
                ex = paid - prple;
            }
            if (shortt > ex) {
                tot = shortt - ex;
            } else {
                tot = ex - shortt;
            }
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.USERNAME);
                Statement statement = connection.createStatement();
                String query = "insert into bill(billno,sales,paid,prin,credit,shortt,ex,dates,cdate,tot)values("
                        + billno + "," + salesamt + "," + paid + "," + prple + "," + credit + "," + shortt + "," + ex
                        + ",'" + date + "',now()," + tot + ")";
                statement.execute(query);
                bill.put("status", 1);
            } catch (Exception e) {
                bill.put("status", 0);
                log("message", e);
                e.printStackTrace();

            }
            response.getWriter().print(bill);
        } else if (operation.equals("update")) {
            JSONObject update = new JSONObject();
            int billno = Integer.parseInt(request.getParameter("billno"));

            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = connection.createStatement();
                String querys = "select * from bill where billno=" + billno;
                ResultSet rs = statement.executeQuery(querys);
                if (rs == null) {
                    return;
                }
                if (rs.next()) {
                    String bilno = rs.getString(1);
                    int sal = rs.getInt(2);
                    int paids = rs.getInt(3);
                    int prins = rs.getInt(4);
                    int cred = rs.getInt(5);
                    int shor = rs.getInt(6);
                    int exs = rs.getInt(7);
                    String dates = rs.getString(8);
                    String cdate = rs.getString(9);
                    int tot = rs.getInt(10);
                    try {
                        String oquery =
                                "insert into oldbill(billno,sales,paid,prin,credit,shortt,ex,dates,cdate,tot)values('"
                                        + bilno + "','" + sal + "'," + paids + "" + "," + prins + "," + cred + ","
                                        + shor + "," + exs + ",'" + dates + "','" + cdate + "'," + tot + ")";
                        statement.execute(oquery);
                        int salesamt = Integer.parseInt(request.getParameter("sales"));
                        int paid = Integer.parseInt(request.getParameter("paid"));
                        int prple = Integer.parseInt(request.getParameter("principle"));
                        String date = request.getParameter("date");
                        int credit = 0;
                        int shortt = 0;
                        int ex = 0;
                        credit = salesamt - paid;
                        if (prple > paid) {

                            shortt = prple - paid;
                        } else {
                            ex = prple - paid;
                        }
                        if (shortt > ex) {
                            tot = shortt - ex;
                        } else {
                            tot = ex - shortt;
                        }
                        String query2 = "update bill set sales=" + salesamt + ",paid=" + paid + ",prin=" + prple
                                + ",credit=" + credit + ",shortt=" + shortt + ",ex=" + ex + ",dates='" + date
                                + "' where billno=" + billno + "";
                        statement.execute(query2);

                    } catch (Exception e) {
                    }

                }
                update.put("status", 1);
            } catch (Exception e) {
                update.put("status", 0);

                e.printStackTrace();
            }
            response.getWriter().print(update);
        } else if (operation.equals("getOne")) {
            JSONObject one = new JSONObject();
            int billno = Integer.parseInt(request.getParameter("billno"));
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection con = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = con.createStatement();
                String query = "select * from bill where billno=" + billno + "";
                ResultSet rs = statement.executeQuery(query);
                // System.out.println("welcome" + rs);
                if (rs.next()) {

                    one.put("billNO", rs.getInt(1));
                    one.put("sales", rs.getInt(2));
                    one.put("paid", rs.getInt(3));
                    one.put("prin", rs.getInt(4));
                    one.put("credit", rs.getInt(5));
                    one.put("shortage", rs.getInt(6));
                    one.put("Excess", rs.getInt(7));
                    one.put("date", rs.getString(8));
                    one.put("tot", rs.getInt(9));

                }
                response.getWriter().print(one);
            } catch (Exception e) {
                JSONObject ones = new JSONObject();
                ones.put("status", 0);
                e.printStackTrace();
                response.getWriter().print(ones);
            }

        } else if (operation.equals("getall")) {
            JSONArray all = new JSONArray();
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = connection.createStatement();
                String query = "select * from bill";
                ResultSet rs = statement.executeQuery(query);
                while (rs.next()) {
                    JSONObject getall = new JSONObject();
                    getall.put("billNO", rs.getInt(1));
                    getall.put("sales", rs.getInt(2));
                    getall.put("paid", rs.getInt(3));
                    getall.put("prin", rs.getInt(4));
                    getall.put("credit", rs.getInt(5));
                    getall.put("shortage", rs.getInt(6));
                    getall.put("Excess", rs.getInt(7));
                    getall.put("date", rs.getString(8));
                    all.put(getall);
                }

            } catch (Exception e) {
                JSONObject error = new JSONObject();
                error.put("status", 0);
                all.put(error);
                e.printStackTrace();
            }
            response.getWriter().print(all);
        } else if (operation.equals("delete")) {
            JSONObject del = new JSONObject();
            int billno = Integer.parseInt(request.getParameter("billno"));
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement stat = connection.createStatement();
                String query = "delete from bill where billno=" + billno + "";
                stat.execute(query);
                del.put("status", 1);
            } catch (Exception e) {
                del.put("status", 0);
                e.printStackTrace();
            }
            response.getWriter().print(del);
        } else if (operation.equals("adduser")) {
            JSONObject us = new JSONObject();
            String name = request.getParameter("name");
            String user = request.getParameter("username");
            String pass = request.getParameter("password");
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection cnnection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = cnnection.createStatement();
                String query =
                        "insert into reg(name,user,password)values('" + name + "','" + user + "','" + pass + "')";
                statement.execute(query);
                us.put("status", 1);

            } catch (Exception e) {
                us.put("status", 0);
            }
            response.getWriter().print(us);

        } else if (operation.equals("login")) {
            JSONObject log = new JSONObject();
            String user = request.getParameter("user");
            String pass = request.getParameter("pass");
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = connection.createStatement();
                String query = "select user from reg where user='" + user + "' AND password='" + pass + "'";
                ResultSet rs = statement.executeQuery(query);
                if (rs.next()) {
                    if (user != "") {
                        log.put("username", rs.getString(1));
                        log.put("status", "success");
                    }
                } else {
                    log.put("status", "error");

                }

            } catch (Exception e) {
                log.put("status", 0);
                e.printStackTrace();
            }
            response.getWriter().print(log);
        } else if (operation.equals("total")) {
            JSONArray val = new JSONArray();
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement statement = connection.createStatement();
                String query = "select sum(sales),sum(paid),sum(prin),sum(credit),sum(shortt),sum(ex) from bill";
                ResultSet rs = statement.executeQuery(query);
                if (rs.next()) {
                    JSONObject tot = new JSONObject();
                    tot.put("sales", rs.getString(1));
                    tot.put("paid", rs.getString(2));
                    tot.put("prin", rs.getString(3));
                    tot.put("credit", rs.getString(4));
                    tot.put("shortage", rs.getString(5));
                    tot.put("excess", rs.getString(6));
                    val.put(tot);

                }
            } catch (Exception e) {
                JSONObject error = new JSONObject();
                val.put(error);
                error.put("status", 0);
                e.printStackTrace();
            }
            response.getWriter().print(val);
        } else if (operation.equals("totlist")) {
            JSONArray list = new JSONArray();
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement stat = connection.createStatement();
                String qry = "select sum(sales),sum(paid),sum(prin),sum(credit),sum(tot) from bill";
                ResultSet res = stat.executeQuery(qry);
                if (res.next()) {
                    JSONObject tots = new JSONObject();
                    tots.put("sales", res.getString(1));
                    tots.put("paid", res.getString(2));
                    tots.put("prin", res.getString(3));
                    tots.put("credit", res.getString(4));
                    tots.put("tot", res.getString(5));
                    list.put(tots);
                }
            } catch (Exception e) {
                JSONObject error = new JSONObject();
                list.put(error);
                error.put("status", 0);
                e.printStackTrace();
            }
            response.getWriter().print(list);
        } else if (operation.equals("getusername")) {
            String usname = request.getParameter("users");
            JSONObject usern = new JSONObject();
            try {
                Class.forName(BillConstant.MYSQL_DRIVER);
                Connection connection = DriverManager.getConnection(url, BillConstant.USERNAME, BillConstant.PASSWORD);
                Statement stat = connection.createStatement();
                String queryname = "select user from reg where user='" + usname + "'";
                ResultSet rst = stat.executeQuery(queryname);
                if (rst.next()) {
                    usern.put("user", rst.getString(1));
                }
                usern.put("status", 1);
                usern.put("message", usname);
            } catch (Exception e) {
                usern.put("status", 0);
                e.printStackTrace();

            }
            response.getWriter().print(usern);
        }

    }
}
