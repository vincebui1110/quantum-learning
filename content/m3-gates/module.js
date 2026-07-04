/* Module 3 - Single-qubit gates */
QP.registerModule({
  id: "m3-gates",
  order: 3,
  accent: "#8A3FFC",
  title: { en: "Single-qubit gates", vi: "Cổng một qubit" },
  subtitle: {
    en: "How we act on a qubit: unitary 2×2 matrices, the Pauli and Hadamard gates, phase gates, rotations of the Bloch sphere, and composing gates into circuits.",
    vi: "Cách tác động lên một qubit: ma trận unita 2×2, các cổng Pauli và Hadamard, cổng pha, phép quay mặt cầu Bloch, và ghép cổng thành mạch."
  },
  lessons: [
    {
      id: "l1-gates-as-matrices",
      minutes: 13,
      title: { en: "Gates as unitary matrices", vi: "Cổng là ma trận unita" },
      quiz: [
        {
          q: {
            en: "What condition makes a 2×2 matrix U a valid single-qubit gate?",
            vi: "Điều kiện nào khiến một ma trận 2×2 U là một cổng một qubit hợp lệ?"
          },
          options: [
            { en: "It must be unitary: U†U = I.", vi: "Nó phải unita: U†U = I." },
            { en: "Its entries must all be real numbers.", vi: "Mọi phần tử của nó phải là số thực." },
            { en: "Its determinant must be zero.", vi: "Định thức của nó phải bằng 0." },
            { en: "It must be symmetric.", vi: "Nó phải đối xứng." }
          ],
          answer: 0,
          explain: {
            en: "A gate must be unitary, U†U = I, where U† is the conjugate transpose. Unitarity is exactly what preserves normalization (total probability 1) and guarantees the gate is reversible via U†.",
            vi: "Một cổng phải unita, U†U = I, với U† là chuyển vị liên hợp. Tính unita chính là thứ bảo toàn chuẩn hoá (tổng xác suất bằng 1) và đảm bảo cổng khả nghịch qua U†."
          }
        },
        {
          q: {
            en: "To apply a gate U to a state |ψ⟩ = (α, β)ᵀ, you compute...",
            vi: "Để áp dụng cổng U lên trạng thái |ψ⟩ = (α, β)ᵀ, bạn tính..."
          },
          options: [
            { en: "The matrix-vector product U|ψ⟩.", vi: "Tích ma trận-vector U|ψ⟩." },
            { en: "The dot product of U's rows with each other.", vi: "Tích vô hướng giữa các hàng của U với nhau." },
            { en: "α + β, then normalize.", vi: "α + β, rồi chuẩn hoá." },
            { en: "The inverse U⁻¹ times |ψ⟩.", vi: "Nghịch đảo U⁻¹ nhân với |ψ⟩." }
          ],
          answer: 0,
          explain: {
            en: "A gate acts by matrix multiplication: the new state is U|ψ⟩, an ordinary matrix times a column vector. Because U is unitary, the result is still normalized.",
            vi: "Một cổng tác động bằng phép nhân ma trận: trạng thái mới là U|ψ⟩, một ma trận nhân với vector cột thông thường. Vì U unita, kết quả vẫn được chuẩn hoá."
          }
        },
        {
          q: {
            en: "Why is every quantum gate reversible?",
            vi: "Vì sao mọi cổng lượng tử đều khả nghịch?"
          },
          options: [
            { en: "Because a unitary U always has an inverse, namely U†.", vi: "Vì một ma trận unita U luôn có nghịch đảo, chính là U†." },
            { en: "Because measurement can undo any gate.", vi: "Vì phép đo có thể hoàn tác bất kỳ cổng nào." },
            { en: "Because gates only ever swap |0⟩ and |1⟩.", vi: "Vì cổng chỉ hoán đổi |0⟩ và |1⟩." },
            { en: "They are not - most gates lose information.", vi: "Không phải - đa số cổng làm mất thông tin." }
          ],
          answer: 0,
          explain: {
            en: "Unitarity gives U†U = I, so U† is a genuine inverse. Applying U† after U returns any state exactly. This is why unitary evolution never destroys information, unlike measurement.",
            vi: "Tính unita cho U†U = I, nên U† là nghịch đảo thực sự. Áp dụng U† sau U đưa mọi trạng thái trở lại chính xác. Đó là lý do tiến hoá unita không bao giờ huỷ thông tin, khác với phép đo."
          }
        }
      ]
    },
    {
      id: "l2-pauli",
      minutes: 13,
      title: { en: "The Pauli gates X, Y, Z", vi: "Các cổng Pauli X, Y, Z" },
      quiz: [
        {
          q: {
            en: "What does the Pauli-X gate do to the basis states?",
            vi: "Cổng Pauli-X làm gì với các trạng thái cơ sở?"
          },
          options: [
            { en: "X|0⟩ = |1⟩ and X|1⟩ = |0⟩ - it flips the bit.", vi: "X|0⟩ = |1⟩ và X|1⟩ = |0⟩ - nó lật bit." },
            { en: "X|0⟩ = |0⟩ and X|1⟩ = −|1⟩.", vi: "X|0⟩ = |0⟩ và X|1⟩ = −|1⟩." },
            { en: "X|0⟩ = |+⟩ and X|1⟩ = |−⟩.", vi: "X|0⟩ = |+⟩ và X|1⟩ = |−⟩." },
            { en: "It leaves both |0⟩ and |1⟩ unchanged.", vi: "Nó giữ nguyên cả |0⟩ và |1⟩." }
          ],
          answer: 0,
          explain: {
            en: "X = [[0,1],[1,0]] swaps the two amplitudes, so X|0⟩ = |1⟩ and X|1⟩ = |0⟩. It is the quantum NOT gate, a bit flip.",
            vi: "X = [[0,1],[1,0]] hoán đổi hai biên độ, nên X|0⟩ = |1⟩ và X|1⟩ = |0⟩. Đó là cổng NOT lượng tử, một phép lật bit."
          }
        },
        {
          q: {
            en: "The Pauli-Z gate acts as Z|0⟩ = |0⟩ and Z|1⟩ = −|1⟩. What is it doing?",
            vi: "Cổng Pauli-Z tác động Z|0⟩ = |0⟩ và Z|1⟩ = −|1⟩. Nó đang làm gì?"
          },
          options: [
            { en: "Flipping the phase of the |1⟩ component.", vi: "Lật pha của thành phần |1⟩." },
            { en: "Flipping the bit like X.", vi: "Lật bit như X." },
            { en: "Measuring the qubit.", vi: "Đo qubit." },
            { en: "Creating a superposition.", vi: "Tạo chồng chập." }
          ],
          answer: 0,
          explain: {
            en: "Z leaves |0⟩ alone but multiplies |1⟩ by −1. This is a phase flip: it is invisible to a standard-basis measurement of a pure |0⟩ or |1⟩, but it flips |+⟩ ↔ |−⟩.",
            vi: "Z giữ nguyên |0⟩ nhưng nhân |1⟩ với −1. Đây là phép lật pha: nó vô hình với phép đo cơ sở chuẩn của |0⟩ hay |1⟩ thuần, nhưng lật |+⟩ ↔ |−⟩."
          }
        },
        {
          q: {
            en: "Why does X² = I hold for the Pauli-X gate?",
            vi: "Vì sao X² = I đúng với cổng Pauli-X?"
          },
          options: [
            { en: "Flipping the bit twice returns the original state.", vi: "Lật bit hai lần đưa về trạng thái ban đầu." },
            { en: "Because X has determinant 1.", vi: "Vì X có định thức bằng 1." },
            { en: "Because X is not really a gate.", vi: "Vì X không thực sự là một cổng." },
            { en: "It doesn't - X² = −I.", vi: "Không đúng - X² = −I." }
          ],
          answer: 0,
          explain: {
            en: "X|0⟩=|1⟩ then X|1⟩=|0⟩, so applying X twice is the identity: X² = I. The same holds for Y and Z: each Pauli is its own inverse (a 180° rotation, done twice, is a full turn).",
            vi: "X|0⟩=|1⟩ rồi X|1⟩=|0⟩, nên áp dụng X hai lần là phép đồng nhất: X² = I. Điều tương tự đúng với Y và Z: mỗi cổng Pauli là nghịch đảo của chính nó (quay 180° hai lần là một vòng trọn)."
          }
        }
      ]
    },
    {
      id: "l3-hadamard",
      minutes: 12,
      title: { en: "The Hadamard gate", vi: "Cổng Hadamard" },
      quiz: [
        {
          q: {
            en: "What is H|0⟩?",
            vi: "H|0⟩ bằng gì?"
          },
          options: [
            { en: "|+⟩ = (1/√2)(|0⟩ + |1⟩).", vi: "|+⟩ = (1/√2)(|0⟩ + |1⟩)." },
            { en: "|1⟩.", vi: "|1⟩." },
            { en: "|0⟩ unchanged.", vi: "|0⟩ không đổi." },
            { en: "|−⟩ = (1/√2)(|0⟩ − |1⟩).", vi: "|−⟩ = (1/√2)(|0⟩ − |1⟩)." }
          ],
          answer: 0,
          explain: {
            en: "H = (1/√2)[[1,1],[1,-1]] sends |0⟩ to the equal superposition |+⟩. This is how a definite state becomes a balanced superposition - the starting move of most quantum algorithms.",
            vi: "H = (1/√2)[[1,1],[1,-1]] đưa |0⟩ thành chồng chập đều |+⟩. Đây là cách một trạng thái xác định trở thành chồng chập cân bằng - bước khởi đầu của hầu hết thuật toán lượng tử."
          }
        },
        {
          q: {
            en: "Why is applying H twice the same as doing nothing (H² = I)?",
            vi: "Vì sao áp dụng H hai lần giống như không làm gì (H² = I)?"
          },
          options: [
            { en: "H is its own inverse, so H|+⟩ = |0⟩ undoes H|0⟩ = |+⟩.", vi: "H là nghịch đảo của chính nó, nên H|+⟩ = |0⟩ hoàn tác H|0⟩ = |+⟩." },
            { en: "Because H erases the qubit.", vi: "Vì H xoá qubit." },
            { en: "Because H measures the qubit twice.", vi: "Vì H đo qubit hai lần." },
            { en: "It is not - H² = X.", vi: "Không phải - H² = X." }
          ],
          answer: 0,
          explain: {
            en: "H is self-inverse: H² = I. So H|0⟩ = |+⟩ and then H|+⟩ = |0⟩. Hadamard both creates superposition (from |0⟩) and removes it (back to |0⟩) - the second H makes amplitudes interfere back to certainty.",
            vi: "H tự nghịch đảo: H² = I. Nên H|0⟩ = |+⟩ rồi H|+⟩ = |0⟩. Hadamard vừa tạo chồng chập (từ |0⟩) vừa gỡ bỏ nó (về lại |0⟩) - cổng H thứ hai khiến biên độ giao thoa trở lại tính chắc chắn."
          }
        }
      ]
    },
    {
      id: "l4-phase-gates",
      minutes: 12,
      title: { en: "Phase gates: S and T", vi: "Cổng pha: S và T" },
      quiz: [
        {
          q: {
            en: "What does the S gate do, S = [[1,0],[0,i]]?",
            vi: "Cổng S làm gì, S = [[1,0],[0,i]]?"
          },
          options: [
            { en: "Leaves |0⟩ alone and multiplies |1⟩ by i (a 90° relative phase).", vi: "Giữ nguyên |0⟩ và nhân |1⟩ với i (một pha tương đối 90°)." },
            { en: "Flips |0⟩ and |1⟩.", vi: "Lật |0⟩ và |1⟩." },
            { en: "Multiplies both |0⟩ and |1⟩ by i.", vi: "Nhân cả |0⟩ và |1⟩ với i." },
            { en: "Creates a superposition from |0⟩.", vi: "Tạo chồng chập từ |0⟩." }
          ],
          answer: 0,
          explain: {
            en: "S adds a relative phase of i = e^{iπ/2} to the |1⟩ component only. It rotates the state 90° about the Z-axis of the Bloch sphere, leaving |0⟩ fixed.",
            vi: "S thêm một pha tương đối i = e^{iπ/2} chỉ vào thành phần |1⟩. Nó quay trạng thái 90° quanh trục Z của mặt cầu Bloch, giữ nguyên |0⟩."
          }
        },
        {
          q: {
            en: "Which relation is correct?",
            vi: "Quan hệ nào đúng?"
          },
          options: [
            { en: "S = T² and Z = S² (so Z = T⁴).", vi: "S = T² và Z = S² (nên Z = T⁴)." },
            { en: "T = S² and S = Z².", vi: "T = S² và S = Z²." },
            { en: "S = Z² and T = S².", vi: "S = Z² và T = S²." },
            { en: "H = S² and S = T².", vi: "H = S² và S = T²." }
          ],
          answer: 0,
          explain: {
            en: "T adds phase e^{iπ/4}; doing it twice gives e^{iπ/2}=i, so T² = S. Doing S twice gives e^{iπ}=−1 on |1⟩, so S² = Z. Hence Z = T⁴. Each is a smaller Z-axis rotation.",
            vi: "T thêm pha e^{iπ/4}; làm hai lần cho e^{iπ/2}=i, nên T² = S. Làm S hai lần cho e^{iπ}=−1 lên |1⟩, nên S² = Z. Do đó Z = T⁴. Mỗi cổng là một phép quay quanh trục Z nhỏ hơn."
          }
        },
        {
          q: {
            en: "Why is the T gate special compared to X, Y, Z, H, and S?",
            vi: "Vì sao cổng T đặc biệt so với X, Y, Z, H, và S?"
          },
          options: [
            { en: "T is non-Clifford; adding it to the Clifford gates enables universal quantum computation.", vi: "T là phi-Clifford; thêm nó vào các cổng Clifford cho phép tính toán lượng tử phổ quát." },
            { en: "T is the only reversible gate.", vi: "T là cổng khả nghịch duy nhất." },
            { en: "T is not unitary.", vi: "T không unita." },
            { en: "T measures the qubit.", vi: "T đo qubit." }
          ],
          answer: 0,
          explain: {
            en: "X, Y, Z, H, S are all Clifford gates; circuits made only from them can be simulated efficiently on a classical computer. The T gate is non-Clifford, and Clifford+T is a universal set - the extra power comes at the cost of being harder to make fault-tolerant.",
            vi: "X, Y, Z, H, S đều là cổng Clifford; mạch chỉ gồm chúng có thể mô phỏng hiệu quả trên máy tính cổ điển. Cổng T là phi-Clifford, và Clifford+T là một tập phổ quát - sức mạnh thêm vào đổi lại việc khó chế tạo chịu lỗi hơn."
          }
        }
      ]
    },
    {
      id: "l5-rotations",
      minutes: 14,
      title: { en: "Rotations and the Bloch sphere", vi: "Phép quay và mặt cầu Bloch" },
      quiz: [
        {
          q: {
            en: "Geometrically, what does every single-qubit gate do to the Bloch sphere?",
            vi: "Về mặt hình học, mọi cổng một qubit làm gì với mặt cầu Bloch?"
          },
          options: [
            { en: "Rotates the whole sphere about some axis by some angle.", vi: "Quay toàn bộ mặt cầu quanh một trục nào đó một góc nào đó." },
            { en: "Shrinks the sphere toward its centre.", vi: "Co mặt cầu về tâm của nó." },
            { en: "Moves the state off the sphere's surface.", vi: "Đưa trạng thái ra khỏi bề mặt cầu." },
            { en: "Randomly relocates the state.", vi: "Di chuyển trạng thái một cách ngẫu nhiên." }
          ],
          answer: 0,
          explain: {
            en: "Every single-qubit unitary is a rigid rotation of the Bloch sphere about some axis. Because it is rigid (a rotation), the state stays on the surface - normalization is preserved, matching unitarity.",
            vi: "Mọi unita một qubit là một phép quay cứng của mặt cầu Bloch quanh một trục nào đó. Vì là phép quay cứng, trạng thái luôn nằm trên bề mặt - chuẩn hoá được bảo toàn, khớp với tính unita."
          }
        },
        {
          q: {
            en: "Why is there a θ/2 (half-angle) inside Rx(θ), Ry(θ), Rz(θ)?",
            vi: "Vì sao có θ/2 (nửa góc) trong Rx(θ), Ry(θ), Rz(θ)?"
          },
          options: [
            { en: "A rotation of the Bloch sphere by angle θ corresponds to θ/2 in the qubit's state vector.", vi: "Một phép quay mặt cầu Bloch góc θ tương ứng θ/2 trong vector trạng thái của qubit." },
            { en: "It is a typo; the angle should be θ.", vi: "Đó là lỗi đánh máy; góc phải là θ." },
            { en: "Because qubits have two states.", vi: "Vì qubit có hai trạng thái." },
            { en: "To make the matrix non-unitary.", vi: "Để làm ma trận không unita." }
          ],
          answer: 0,
          explain: {
            en: "The state vector lives in a 2D complex space that double-covers the Bloch sphere: a full 360° turn of the sphere corresponds to 720° of the state (up to a sign). So a physical rotation by θ uses cos(θ/2), sin(θ/2).",
            vi: "Vector trạng thái sống trong không gian phức 2 chiều phủ đôi mặt cầu Bloch: một vòng 360° của mặt cầu tương ứng 720° của trạng thái (sai khác một dấu). Nên một phép quay vật lý góc θ dùng cos(θ/2), sin(θ/2)."
          }
        }
      ]
    },
    {
      id: "l6-sequences",
      minutes: 13,
      title: { en: "Composing gates into circuits", vi: "Ghép cổng thành mạch" },
      quiz: [
        {
          q: {
            en: "A circuit applies gate A first, then B, to |ψ⟩. The final state is...",
            vi: "Một mạch áp dụng cổng A trước, rồi B, lên |ψ⟩. Trạng thái cuối là..."
          },
          options: [
            { en: "B·A|ψ⟩ - the later gate multiplies from the left.", vi: "B·A|ψ⟩ - cổng sau nhân từ bên trái." },
            { en: "A·B|ψ⟩ - in reading order.", vi: "A·B|ψ⟩ - theo thứ tự đọc." },
            { en: "(A + B)|ψ⟩.", vi: "(A + B)|ψ⟩." },
            { en: "A|ψ⟩ only; B is ignored.", vi: "Chỉ A|ψ⟩; B bị bỏ qua." }
          ],
          answer: 0,
          explain: {
            en: "Gates compose by matrix multiplication, and matrices act on the left, so 'A then B' is B·A|ψ⟩. You read a circuit left to right, but write the product right to left.",
            vi: "Cổng ghép bằng phép nhân ma trận, và ma trận tác động từ bên trái, nên 'A rồi B' là B·A|ψ⟩. Bạn đọc mạch từ trái sang phải, nhưng viết tích từ phải sang trái."
          }
        },
        {
          q: {
            en: "Why does the order of gates matter, e.g. HX ≠ XH?",
            vi: "Vì sao thứ tự cổng quan trọng, ví dụ HX ≠ XH?"
          },
          options: [
            { en: "Matrix multiplication does not generally commute.", vi: "Phép nhân ma trận nói chung không giao hoán." },
            { en: "Because H is not a real gate.", vi: "Vì H không phải cổng thật." },
            { en: "Because X erases the qubit first.", vi: "Vì X xoá qubit trước." },
            { en: "It doesn't matter; order never changes the result.", vi: "Không quan trọng; thứ tự không bao giờ đổi kết quả." }
          ],
          answer: 0,
          explain: {
            en: "Matrices generally do not commute, so BA ≠ AB in general. Concretely XH|0⟩ = |+⟩ while HX|0⟩ = |−⟩ - different physical states - so the order in which you apply gates genuinely matters.",
            vi: "Ma trận nói chung không giao hoán, nên BA ≠ AB nói chung. Cụ thể XH|0⟩ = |+⟩ còn HX|0⟩ = |−⟩ - hai trạng thái vật lý khác nhau - nên thứ tự áp dụng cổng thực sự quan trọng."
          }
        }
      ]
    }
  ]
});
