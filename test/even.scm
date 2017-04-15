(define (even? num)
  (if (= num 0) 
      #t
      (if (= num 1)
          #f
          (odd? (- num 1)))))

(define (odd? num)
  (if (= num 1)
      #t
      (even? (- num 1))))

(odd? 10)