# Lisp-Evaluator
Lisp Evaluator 

### feature

+ 数学运算符 + - * /

  ```lisp
  (+ 1 1 (- 1 2 ) (* 3 4)) ;13
  ```

+ 比较运算`=, <, > , >=, <=`

  ```lisp
  (if (= 1 1) #t #f)
  ```

  ​

+ 变量定义

  ```lisp
  (define a 1) a ; 1
  (define a (+ 1 1)) ;2
  ```

+ 函数定义

  ```lisp
  (define (squares arg) 
    (* arg arg))
  (define (sum-of-squares x y)
    (+ (squares x) (squares y)))
  (sum-of-squares 3 4) ;25
  ```

+ 闭包

  ```lisp
  (define (a) 
    (define a (+ 1 1))
    (define (b) a))
  (define b (a))
  (b) ;2
  ```

+ 高阶函数

  ```lisp
  (define (fun cb) (cb 2))
  (define (fn arg) (* 10 arg))
  (fun fn) ;20
  ```

+ 递归调用

  ```lisp
  (define (fact n)
    (if (= n 1)
        1
        (+ n (fact (- n 1)))))

  (fact 10) ; 55
  ```



### Todo

- [ ] 字符


- [ ] 符号


- [ ] cons 


- [ ] list


- [ ] lambda

      ​