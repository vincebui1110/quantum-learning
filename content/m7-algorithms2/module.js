/* Module 7 - Quantum algorithms II (the famous ones) */
QP.registerModule({
  id: "m7-algorithms2",
  order: 7,
  accent: "#C08A1E",
  title: { en: "Quantum algorithms II (the famous ones)", vi: "Thuật toán lượng tử II (những cái nổi tiếng)" },
  subtitle: {
    en: "Grover's search and Shor's factoring - the two headline algorithms - plus an honest map of what quantum speed-ups really buy you, and what they do not.",
    vi: "Tìm kiếm Grover và phân tích Shor - hai thuật toán tiêu biểu - cùng một bản đồ trung thực về việc tăng tốc lượng tử thực sự mang lại gì, và không mang lại gì."
  },
  lessons: [
    {
      id: "l1-grover",
      minutes: 14,
      title: { en: "Grover's search", vi: "Tìm kiếm Grover" },
      quiz: [
        {
          q: {
            en: "Grover searches an unstructured list of N items. Roughly how many iterations does it need, and what kind of speed-up is that?",
            vi: "Grover tìm trong một danh sách N phần tử không có cấu trúc. Cần khoảng bao nhiêu vòng lặp, và đó là loại tăng tốc gì?"
          },
          options: [
            { en: "About log₂N iterations - an exponential speed-up.", vi: "Khoảng log₂N vòng - tăng tốc theo hàm mũ." },
            { en: "About (π/4)√N iterations - a quadratic speed-up over the ~N/2 classical checks.", vi: "Khoảng (π/4)√N vòng - tăng tốc bậc hai so với ~N/2 lần kiểm tra cổ điển." },
            { en: "About N iterations - no speed-up at all.", vi: "Khoảng N vòng - không tăng tốc gì cả." },
            { en: "Exactly 1 iteration for any N.", vi: "Đúng 1 vòng cho mọi N." }
          ],
          answer: 1,
          explain: {
            en: "Grover needs ~(π/4)√N iterations. Since a classical search checks ~N/2 items on average, going from N to √N is a quadratic (not exponential) speed-up.",
            vi: "Grover cần ~(π/4)√N vòng. Vì tìm kiếm cổ điển trung bình kiểm tra ~N/2 phần tử, đi từ N xuống √N là tăng tốc bậc hai (không phải hàm mũ)."
          }
        },
        {
          q: {
            en: "What are the two operations repeated in each Grover iteration?",
            vi: "Hai phép toán được lặp lại trong mỗi vòng Grover là gì?"
          },
          options: [
            { en: "A measurement, then a reset.", vi: "Một phép đo, rồi một lần reset." },
            { en: "An oracle that flips the sign of the target's amplitude, then a diffusion operator (inversion about the mean).", vi: "Một oracle đảo dấu biên độ của mục tiêu, rồi một toán tử khuếch tán (đảo quanh giá trị trung bình)." },
            { en: "Two Hadamard gates in a row.", vi: "Hai cổng Hadamard liên tiếp." },
            { en: "A QFT, then a phase estimation.", vi: "Một QFT, rồi một phép ước lượng pha." }
          ],
          answer: 1,
          explain: {
            en: "Each iteration = oracle (marks the target by negating its amplitude) + diffusion (reflects all amplitudes about their mean). Together they nudge amplitude toward the target.",
            vi: "Mỗi vòng = oracle (đánh dấu mục tiêu bằng cách đổi dấu biên độ) + khuếch tán (phản chiếu mọi biên độ quanh trung bình của chúng). Cùng nhau chúng dồn biên độ về phía mục tiêu."
          }
        },
        {
          q: {
            en: "Why can running Grover for too many iterations make it fail?",
            vi: "Vì sao chạy Grover quá nhiều vòng lại khiến nó thất bại?"
          },
          options: [
            { en: "The qubits overheat.", vi: "Các qubit bị quá nhiệt." },
            { en: "Each iteration rotates the state by a fixed angle; past the optimum you over-rotate and the success probability drops again.", vi: "Mỗi vòng quay trạng thái một góc cố định; vượt quá điểm tối ưu bạn quay lố và xác suất thành công lại giảm." },
            { en: "The oracle stops working after √N calls.", vi: "Oracle ngừng hoạt động sau √N lần gọi." },
            { en: "It never fails - more iterations always help.", vi: "Nó không bao giờ thất bại - càng nhiều vòng càng tốt." }
          ],
          answer: 1,
          explain: {
            en: "Grover is a rotation by a fixed angle per step. It peaks near (π/4)√N iterations; continuing rotates past the target and the probability falls. You must stop at (roughly) the right count.",
            vi: "Grover là một phép quay góc cố định mỗi bước. Nó đạt đỉnh gần (π/4)√N vòng; tiếp tục sẽ quay lố qua mục tiêu và xác suất giảm. Bạn phải dừng ở (xấp xỉ) số vòng đúng."
          }
        }
      ]
    },
    {
      id: "l2-grover-geometry",
      minutes: 13,
      title: { en: "Grover geometrically & amplitude amplification", vi: "Grover theo hình học & khuếch đại biên độ" },
      quiz: [
        {
          q: {
            en: "In the 2D geometric picture, what does one full Grover iteration do to the state vector?",
            vi: "Trong bức tranh hình học 2 chiều, một vòng Grover đầy đủ làm gì với vector trạng thái?"
          },
          options: [
            { en: "It flips the state to a random direction.", vi: "Nó lật trạng thái sang một hướng ngẫu nhiên." },
            { en: "Two reflections combine into a rotation by a fixed angle 2θ toward the target axis.", vi: "Hai phép phản chiếu kết hợp thành một phép quay góc cố định 2θ về phía trục mục tiêu." },
            { en: "It shrinks the vector's length.", vi: "Nó làm ngắn độ dài vector." },
            { en: "It leaves the state unchanged.", vi: "Nó giữ nguyên trạng thái." }
          ],
          answer: 1,
          explain: {
            en: "The oracle reflects about the 'non-target' axis and diffusion reflects about the starting state |s⟩. Two reflections = a rotation, by angle 2θ each iteration, in the plane spanned by |target⟩ and the rest.",
            vi: "Oracle phản chiếu quanh trục 'không phải mục tiêu' và khuếch tán phản chiếu quanh trạng thái xuất phát |s⟩. Hai phản chiếu = một phép quay, góc 2θ mỗi vòng, trong mặt phẳng căng bởi |mục tiêu⟩ và phần còn lại."
          }
        },
        {
          q: {
            en: "For one marked item in N, the initial angle θ satisfies sin θ = 1/√N. For large N this means each iteration rotates by about...",
            vi: "Với một mục tiêu trong N, góc ban đầu θ thoả sin θ = 1/√N. Với N lớn, mỗi vòng quay khoảng..."
          },
          options: [
            { en: "2/√N radians, so ~(π/4)√N iterations reach 90°.", vi: "2/√N radian, nên ~(π/4)√N vòng đạt tới 90°." },
            { en: "π radians per iteration.", vi: "π radian mỗi vòng." },
            { en: "A fixed 45° regardless of N.", vi: "Cố định 45° bất kể N." },
            { en: "1/N radians.", vi: "1/N radian." }
          ],
          answer: 0,
          explain: {
            en: "For large N, θ ≈ 1/√N, so a rotation of 2θ ≈ 2/√N per step. To reach the target (near π/2 total) needs ~(π/2)/(2/√N) = (π/4)√N iterations - matching the count from lesson 1.",
            vi: "Với N lớn, θ ≈ 1/√N, nên mỗi bước quay 2θ ≈ 2/√N. Để tới mục tiêu (tổng gần π/2) cần ~(π/2)/(2/√N) = (π/4)√N vòng - khớp với con số ở bài 1."
          }
        }
      ]
    },
    {
      id: "l3-shor",
      minutes: 16,
      title: { en: "Shor's factoring algorithm", vi: "Thuật toán phân tích Shor" },
      quiz: [
        {
          q: {
            en: "What problem does Shor's algorithm reduce integer factoring to?",
            vi: "Thuật toán Shor quy bài toán phân tích số nguyên về bài toán nào?"
          },
          options: [
            { en: "Sorting a list of numbers.", vi: "Sắp xếp một danh sách số." },
            { en: "Finding the period r of the function a^x mod N.", vi: "Tìm chu kỳ r của hàm a^x mod N." },
            { en: "Searching an unstructured database.", vi: "Tìm trong một cơ sở dữ liệu không cấu trúc." },
            { en: "Adding two large numbers.", vi: "Cộng hai số lớn." }
          ],
          answer: 1,
          explain: {
            en: "Shor reduces factoring N to period-finding: find the period r of x ↦ a^x mod N. The quantum computer finds r via phase estimation/QFT; classical steps (gcd, continued fractions) then extract the factors.",
            vi: "Shor quy phân tích N về tìm chu kỳ: tìm chu kỳ r của x ↦ a^x mod N. Máy lượng tử tìm r qua ước lượng pha/QFT; các bước cổ điển (gcd, liên phân số) sau đó rút ra các thừa số."
          }
        },
        {
          q: {
            en: "What kind of speed-up does Shor give, and what is the practical consequence?",
            vi: "Shor cho loại tăng tốc gì, và hệ quả thực tế là gì?"
          },
          options: [
            { en: "Quadratic; it slightly slows down password cracking.", vi: "Bậc hai; nó làm chậm nhẹ việc bẻ mật khẩu." },
            { en: "Exponential over the best known classical factoring; it threatens RSA/ECC, driving post-quantum cryptography.", vi: "Hàm mũ so với thuật toán cổ điển tốt nhất đã biết; nó đe doạ RSA/ECC, thúc đẩy mật mã hậu lượng tử." },
            { en: "No speed-up; it is only of theoretical interest.", vi: "Không tăng tốc; chỉ có giá trị lý thuyết." },
            { en: "It makes classical computers faster.", vi: "Nó làm máy tính cổ điển nhanh hơn." }
          ],
          answer: 1,
          explain: {
            en: "Shor runs in polynomial time - an exponential speed-up over the best known classical factoring. Because RSA and ECC rest on factoring/discrete-log hardness, a large fault-tolerant machine would break them, motivating post-quantum crypto.",
            vi: "Shor chạy trong thời gian đa thức - tăng tốc hàm mũ so với thuật toán phân tích cổ điển tốt nhất đã biết. Vì RSA và ECC dựa vào độ khó phân tích/logarit rời rạc, một máy chịu lỗi đủ lớn sẽ bẻ được chúng, thúc đẩy mật mã hậu lượng tử."
          }
        },
        {
          q: {
            en: "Can today's quantum hardware factor a real 2048-bit RSA key?",
            vi: "Phần cứng lượng tử ngày nay có phân tích được một khoá RSA 2048-bit thật không?"
          },
          options: [
            { en: "Yes - it happens routinely already.", vi: "Có - việc đó đã diễn ra thường xuyên." },
            { en: "No - real keys need millions of high-quality qubits with error correction, far beyond current devices.", vi: "Không - khoá thật cần hàng triệu qubit chất lượng cao có sửa lỗi, vượt xa thiết bị hiện nay." },
            { en: "Yes, but only for even numbers.", vi: "Có, nhưng chỉ với số chẵn." },
            { en: "No, because Shor's algorithm is mathematically wrong.", vi: "Không, vì thuật toán Shor sai về mặt toán học." }
          ],
          answer: 1,
          explain: {
            en: "Shor is correct and proven, but cryptographically relevant factoring needs far more logical qubits (with heavy error correction) than any current device has. Demonstrations factor only tiny numbers. The threat is real but not yet present.",
            vi: "Shor đúng và đã được chứng minh, nhưng phân tích ở quy mô liên quan mật mã cần nhiều qubit logic hơn (kèm sửa lỗi nặng) so với bất kỳ thiết bị nào hiện có. Các minh hoạ chỉ phân tích số rất nhỏ. Mối đe doạ có thật nhưng chưa hiện hữu."
          }
        }
      ]
    },
    {
      id: "l4-complexity",
      minutes: 13,
      title: { en: "What quantum speed-ups actually mean (BQP)", vi: "Tăng tốc lượng tử thực sự nghĩa là gì (BQP)" },
      quiz: [
        {
          q: {
            en: "BQP is the class of problems that...",
            vi: "BQP là lớp các bài toán mà..."
          },
          options: [
            { en: "...no computer can ever solve.", vi: "...không máy tính nào có thể giải." },
            { en: "...a quantum computer can solve efficiently (in polynomial time) with high probability.", vi: "...một máy tính lượng tử giải được hiệu quả (thời gian đa thức) với xác suất cao." },
            { en: "...only classical computers can solve.", vi: "...chỉ máy tính cổ điển giải được." },
            { en: "...require infinite memory.", vi: "...cần bộ nhớ vô hạn." }
          ],
          answer: 1,
          explain: {
            en: "BQP (bounded-error quantum polynomial time) is the set of problems a quantum computer solves efficiently with high success probability. P ⊆ BQP, and factoring is in BQP but not known to be in P.",
            vi: "BQP (thời gian đa thức lượng tử sai số bị chặn) là tập các bài toán máy lượng tử giải hiệu quả với xác suất thành công cao. P ⊆ BQP, và phân tích số thuộc BQP nhưng chưa biết có thuộc P hay không."
          }
        },
        {
          q: {
            en: "Are quantum computers believed to solve NP-complete problems efficiently in general?",
            vi: "Máy tính lượng tử có được tin là giải hiệu quả các bài toán NP-đầy đủ nói chung không?"
          },
          options: [
            { en: "Yes - a quantum computer tries all answers at once and picks the right one.", vi: "Có - máy lượng tử thử mọi đáp án cùng lúc và chọn cái đúng." },
            { en: "No - there is no known efficient quantum algorithm for NP-complete problems; speed-ups come from interference on structured problems, not brute-force parallelism.", vi: "Không - không có thuật toán lượng tử hiệu quả nào đã biết cho bài toán NP-đầy đủ; tăng tốc đến từ giao thoa trên bài toán có cấu trúc, không phải song song vét cạn." },
            { en: "Yes, but only on Tuesdays.", vi: "Có, nhưng chỉ vào thứ Ba." },
            { en: "No, because NP-complete problems are undecidable.", vi: "Không, vì bài toán NP-đầy đủ là không quyết định được." }
          ],
          answer: 1,
          explain: {
            en: "It is widely believed BQP does not contain NP-complete problems. A quantum computer does NOT try all answers and read one off - measurement gives a single random outcome. Speed-ups need interference to concentrate amplitude on the answer, which only works for structured problems.",
            vi: "Người ta tin rộng rãi rằng BQP không chứa các bài toán NP-đầy đủ. Máy lượng tử KHÔNG thử mọi đáp án rồi đọc ra một cái - phép đo chỉ cho một kết quả ngẫu nhiên. Tăng tốc cần giao thoa để dồn biên độ về đáp án, điều chỉ hiệu quả với bài toán có cấu trúc."
          }
        }
      ]
    }
  ]
});
