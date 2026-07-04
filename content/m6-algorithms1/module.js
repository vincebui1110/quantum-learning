/* Module 6 - Quantum algorithms I (foundations of speed-up) */
QP.registerModule({
  id: "m6-algorithms1",
  order: 6,
  accent: "#7C3AED",
  title: {
    en: "Quantum algorithms I - foundations of speed-up",
    vi: "Thuật toán lượng tử I - nền tảng của tăng tốc"
  },
  subtitle: {
    en: "Oracles, phase kickback, and the first provable quantum advantages: Deutsch-Jozsa, Bernstein-Vazirani, the quantum Fourier transform, and phase estimation - the subroutine behind Shor.",
    vi: "Oracle, phản hồi pha, và những lợi thế lượng tử chứng minh được đầu tiên: Deutsch-Jozsa, Bernstein-Vazirani, biến đổi Fourier lượng tử, và ước lượng pha - chương trình con nằm sau thuật toán Shor."
  },
  lessons: [
    {
      id: "l1-oracles",
      minutes: 14,
      title: {
        en: "Oracles, the query model, and phase kickback",
        vi: "Oracle, mô hình truy vấn, và phản hồi pha"
      },
      quiz: [
        {
          q: {
            en: "An oracle Uf for a function f acts on |x⟩|y⟩ as which of the following?",
            vi: "Một oracle Uf cho hàm f tác động lên |x⟩|y⟩ như thế nào?"
          },
          options: [
            { en: "|x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩", vi: "|x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩" },
            { en: "|x⟩|y⟩ → |f(x)⟩|y⟩", vi: "|x⟩|y⟩ → |f(x)⟩|y⟩" },
            { en: "|x⟩|y⟩ → |x⟩|y⟩ and prints f(x)", vi: "|x⟩|y⟩ → |x⟩|y⟩ rồi in ra f(x)" },
            { en: "|x⟩|y⟩ → |y⟩|x⟩", vi: "|x⟩|y⟩ → |y⟩|x⟩" }
          ],
          answer: 0,
          explain: {
            en: "The standard reversible oracle XORs f(x) into the target register: |x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩. Overwriting y with f(x) would not be reversible, so it cannot be a valid unitary.",
            vi: "Oracle thuận nghịch tiêu chuẩn XOR giá trị f(x) vào thanh ghi đích: |x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩. Ghi đè y bằng f(x) sẽ không thuận nghịch, nên không thể là một unitary hợp lệ."
          }
        },
        {
          q: {
            en: "Set the target qubit to |−⟩ before querying Uf. What happens to the input register?",
            vi: "Đặt qubit đích về |−⟩ trước khi truy vấn Uf. Điều gì xảy ra với thanh ghi đầu vào?"
          },
          options: [
            { en: "Nothing - |−⟩ is unaffected by any oracle.", vi: "Không gì cả - |−⟩ không bị oracle nào ảnh hưởng." },
            { en: "It picks up a phase (−1)^{f(x)}: Uf|x⟩|−⟩ = (−1)^{f(x)}|x⟩|−⟩.", vi: "Nó nhận một pha (−1)^{f(x)}: Uf|x⟩|−⟩ = (−1)^{f(x)}|x⟩|−⟩." },
            { en: "The input collapses to a definite x.", vi: "Đầu vào sập về một x xác định." },
            { en: "The target register is overwritten with f(x).", vi: "Thanh ghi đích bị ghi đè bằng f(x)." }
          ],
          answer: 1,
          explain: {
            en: "This is phase kickback. Because |−⟩ is an eigenstate of the bit-flip with eigenvalue −1, XOR-ing f(x) multiplies the whole term by (−1)^{f(x)}. The function's value is 'kicked back' onto the input register as a relative phase.",
            vi: "Đây là phản hồi pha (phase kickback). Vì |−⟩ là trạng thái riêng của phép lật bit với trị riêng −1, việc XOR f(x) nhân cả số hạng với (−1)^{f(x)}. Giá trị của hàm được 'phản hồi' lên thanh ghi đầu vào dưới dạng pha tương đối."
          }
        }
      ]
    },
    {
      id: "l2-deutsch-jozsa",
      minutes: 15,
      title: {
        en: "Deutsch and Deutsch-Jozsa",
        vi: "Deutsch và Deutsch-Jozsa"
      },
      quiz: [
        {
          q: {
            en: "The Deutsch-Jozsa problem promises f is either constant or balanced. How many oracle queries does the quantum algorithm need to decide which?",
            vi: "Bài toán Deutsch-Jozsa hứa hẹn f hoặc hằng hoặc cân bằng. Thuật toán lượng tử cần bao nhiêu lần truy vấn oracle để quyết định?"
          },
          options: [
            { en: "Exactly one query.", vi: "Đúng một lần truy vấn." },
            { en: "n queries, one per input bit.", vi: "n lần, mỗi bit đầu vào một lần." },
            { en: "2^{n-1} + 1 queries.", vi: "2^{n-1} + 1 lần." },
            { en: "It depends on the specific function.", vi: "Tuỳ vào hàm cụ thể." }
          ],
          answer: 0,
          explain: {
            en: "A single query suffices. Interference makes the input register return to |0...0⟩ exactly when f is constant, and never when f is balanced - so one measurement decides the case with certainty.",
            vi: "Một lần truy vấn là đủ. Giao thoa khiến thanh ghi đầu vào trở về |0...0⟩ đúng khi f hằng, và không bao giờ khi f cân bằng - nên một phép đo quyết định chắc chắn."
          }
        },
        {
          q: {
            en: "In the single-bit Deutsch algorithm, after the second Hadamard you measure the input qubit. What outcome tells you f is constant?",
            vi: "Trong thuật toán Deutsch một bit, sau Hadamard thứ hai bạn đo qubit đầu vào. Kết quả nào cho biết f là hằng?"
          },
          options: [
            { en: "Measuring 1.", vi: "Đo được 1." },
            { en: "Measuring 0.", vi: "Đo được 0." },
            { en: "A 50/50 random outcome.", vi: "Một kết quả ngẫu nhiên 50/50." },
            { en: "You cannot tell from one measurement.", vi: "Không thể biết từ một phép đo." }
          ],
          answer: 1,
          explain: {
            en: "The interference maps the input to (−1)^{f(0)}|f(0)⊕f(1)⟩. If f is constant, f(0)⊕f(1)=0 and you measure 0; if balanced, the XOR is 1 and you measure 1. Global sign is irrelevant.",
            vi: "Giao thoa đưa đầu vào về (−1)^{f(0)}|f(0)⊕f(1)⟩. Nếu f hằng, f(0)⊕f(1)=0 và bạn đo được 0; nếu cân bằng, XOR bằng 1 và bạn đo được 1. Dấu toàn cục không quan trọng."
          }
        }
      ]
    },
    {
      id: "l3-bernstein-vazirani",
      minutes: 13,
      title: {
        en: "Bernstein-Vazirani",
        vi: "Bernstein-Vazirani"
      },
      quiz: [
        {
          q: {
            en: "In Bernstein-Vazirani the hidden function is f(x) = s·x mod 2 for a secret n-bit string s. How many quantum queries recover all of s?",
            vi: "Trong Bernstein-Vazirani, hàm ẩn là f(x) = s·x mod 2 với chuỗi bí mật s dài n bit. Cần bao nhiêu truy vấn lượng tử để lấy toàn bộ s?"
          },
          options: [
            { en: "One query returns s in full.", vi: "Một truy vấn trả về toàn bộ s." },
            { en: "n queries, one bit at a time.", vi: "n truy vấn, mỗi lần một bit." },
            { en: "log n queries.", vi: "log n truy vấn." },
            { en: "2^n queries.", vi: "2^n truy vấn." }
          ],
          answer: 0,
          explain: {
            en: "A single query does it. With phase kickback the state becomes (−1)^{s·x} summed over x; a layer of Hadamards then interferes this into exactly |s⟩, which you read off directly.",
            vi: "Một truy vấn là xong. Với phản hồi pha, trạng thái trở thành tổng (−1)^{s·x} theo x; một lớp Hadamard rồi giao thoa nó về đúng |s⟩, đọc ra trực tiếp."
          }
        },
        {
          q: {
            en: "How many queries does the best classical strategy need to determine an n-bit s in this problem?",
            vi: "Chiến lược cổ điển tốt nhất cần bao nhiêu truy vấn để xác định s dài n bit trong bài toán này?"
          },
          options: [
            { en: "n queries - one per bit, using inputs e_1,...,e_n.", vi: "n truy vấn - mỗi bit một lần, dùng đầu vào e_1,...,e_n." },
            { en: "One query, same as quantum.", vi: "Một truy vấn, giống lượng tử." },
            { en: "Always exactly 2 queries.", vi: "Luôn đúng 2 truy vấn." },
            { en: "It is classically impossible.", vi: "Cổ điển không thể làm được." }
          ],
          answer: 0,
          explain: {
            en: "Classically each query f(e_k) reveals exactly one bit s_k (the k-th bit of s), so n queries are needed and n suffice. The quantum algorithm compresses all n into one - a clean n-to-1 query separation.",
            vi: "Cổ điển, mỗi truy vấn f(e_k) lộ đúng một bit s_k (bit thứ k của s), nên cần n truy vấn và n là đủ. Thuật toán lượng tử nén cả n thành một - một tách biệt truy vấn n-về-1 gọn gàng."
          }
        }
      ]
    },
    {
      id: "l4-qft",
      minutes: 15,
      title: {
        en: "The Quantum Fourier Transform",
        vi: "Biến đổi Fourier lượng tử"
      },
      quiz: [
        {
          q: {
            en: "The QFT on n qubits maps a basis state |x⟩ to which superposition (N = 2^n)?",
            vi: "QFT trên n qubit đưa trạng thái cơ sở |x⟩ về chồng chập nào (N = 2^n)?"
          },
          options: [
            { en: "(1/√N) Σ_k e^{2πi xk/N} |k⟩", vi: "(1/√N) Σ_k e^{2πi xk/N} |k⟩" },
            { en: "(1/N) Σ_k |k⟩", vi: "(1/N) Σ_k |k⟩" },
            { en: "|x⟩ → |N − x⟩", vi: "|x⟩ → |N − x⟩" },
            { en: "(1/√N) Σ_k e^{−xk} |k⟩", vi: "(1/√N) Σ_k e^{−xk} |k⟩" }
          ],
          answer: 0,
          explain: {
            en: "The QFT is the discrete Fourier transform acting on amplitudes: |x⟩ → (1/√N) Σ_{k=0}^{N-1} e^{2πi xk/N} |k⟩. The e^{2πi xk/N} phases are exactly the DFT kernel.",
            vi: "QFT là biến đổi Fourier rời rạc tác động lên biên độ: |x⟩ → (1/√N) Σ_{k=0}^{N-1} e^{2πi xk/N} |k⟩. Các pha e^{2πi xk/N} chính là nhân DFT."
          }
        },
        {
          q: {
            en: "How many gates does the standard QFT circuit on n qubits use, and does it hand you a readable Fourier spectrum?",
            vi: "Mạch QFT chuẩn trên n qubit dùng bao nhiêu cổng, và nó có đưa cho bạn phổ Fourier đọc được không?"
          },
          options: [
            { en: "O(n²) gates; no - you still have to measure, which samples but does not reveal amplitudes.", vi: "O(n²) cổng; không - bạn vẫn phải đo, chỉ lấy mẫu chứ không lộ biên độ." },
            { en: "O(2^n) gates; yes, it prints the full spectrum.", vi: "O(2^n) cổng; có, nó in ra toàn bộ phổ." },
            { en: "O(n) gates; yes.", vi: "O(n) cổng; có." },
            { en: "O(n²) gates; yes, all amplitudes become directly visible.", vi: "O(n²) cổng; có, mọi biên độ hiện ra trực tiếp." }
          ],
          answer: 0,
          explain: {
            en: "The QFT needs only O(n²) gates (vs O(N log N) for the classical FFT on N = 2^n numbers), an exponential edge in gate count. But measurement collapses the state, so you sample outcomes rather than read the Fourier amplitudes - the transform is a tool inside larger algorithms, not a spectrum printer.",
            vi: "QFT chỉ cần O(n²) cổng (so với O(N log N) của FFT cổ điển trên N = 2^n số), một lợi thế hàm mũ về số cổng. Nhưng phép đo làm sập trạng thái, nên bạn lấy mẫu kết quả chứ không đọc được biên độ Fourier - biến đổi này là công cụ bên trong các thuật toán lớn hơn, không phải máy in phổ."
          }
        }
      ]
    },
    {
      id: "l5-phase-estimation",
      minutes: 15,
      title: {
        en: "Quantum phase estimation",
        vi: "Ước lượng pha lượng tử"
      },
      quiz: [
        {
          q: {
            en: "Phase estimation takes a unitary U and an eigenstate |u⟩ with U|u⟩ = e^{2πiφ}|u⟩. What does it produce?",
            vi: "Ước lượng pha nhận một unitary U và trạng thái riêng |u⟩ với U|u⟩ = e^{2πiφ}|u⟩. Nó tạo ra gì?"
          },
          options: [
            { en: "An n-bit estimate of the phase φ in a counting register.", vi: "Một ước lượng n bit của pha φ trong thanh ghi đếm." },
            { en: "The eigenstate |u⟩ itself, copied.", vi: "Chính trạng thái riêng |u⟩, được sao chép." },
            { en: "The matrix U written out in full.", vi: "Toàn bộ ma trận U viết ra." },
            { en: "A random bit unrelated to φ.", vi: "Một bit ngẫu nhiên không liên quan tới φ." }
          ],
          answer: 0,
          explain: {
            en: "Phase estimation writes an approximation of φ (to n bits of precision) into the counting register. Controlled-U^{2^j} powers imprint the phases via kickback, and the inverse QFT decodes them into a measurable binary number.",
            vi: "Ước lượng pha ghi một xấp xỉ của φ (chính xác tới n bit) vào thanh ghi đếm. Các luỹ thừa controlled-U^{2^j} in các pha qua kickback, và QFT ngược giải mã chúng thành một số nhị phân đo được."
          }
        },
        {
          q: {
            en: "Which step is responsible for turning the encoded phases into a number you can read by measurement?",
            vi: "Bước nào biến các pha đã mã hoá thành một con số bạn có thể đọc bằng phép đo?"
          },
          options: [
            { en: "The inverse QFT applied to the counting register.", vi: "QFT ngược áp lên thanh ghi đếm." },
            { en: "A single Hadamard on |u⟩.", vi: "Một cổng Hadamard trên |u⟩." },
            { en: "Measuring U directly.", vi: "Đo trực tiếp U." },
            { en: "Preparing |u⟩ in the |−⟩ state.", vi: "Chuẩn bị |u⟩ ở trạng thái |−⟩." }
          ],
          answer: 0,
          explain: {
            en: "After the controlled powers, the counting register holds the phase in the Fourier basis. The inverse QFT converts it to the computational basis, so a measurement reads the bits of φ. This is the core subroutine inside Shor's factoring and quantum chemistry energy estimation.",
            vi: "Sau các luỹ thừa có điều khiển, thanh ghi đếm giữ pha trong cơ sở Fourier. QFT ngược chuyển nó về cơ sở tính toán, nên phép đo đọc được các bit của φ. Đây là chương trình con cốt lõi bên trong thuật toán phân tích thừa số Shor và ước lượng năng lượng trong hoá học lượng tử."
          }
        }
      ]
    }
  ]
});
