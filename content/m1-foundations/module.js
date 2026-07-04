/* Module 1 - Foundations */
QP.registerModule({
  id: "m1-foundations",
  order: 1,
  accent: "#1E76B0",
  title: { en: "Foundations", vi: "Nền tảng" },
  subtitle: {
    en: "Why quantum computing exists, and the small toolkit of math - complex numbers, vectors, probability, and matrices - that every later idea rests on.",
    vi: "Vì sao có điện toán lượng tử, và bộ công cụ toán nhỏ gọn - số phức, vector, xác suất, và ma trận - làm nền cho mọi ý tưởng về sau."
  },
  lessons: [
    {
      id: "l1-why-quantum",
      minutes: 11,
      title: { en: "Why quantum computing exists", vi: "Vì sao có điện toán lượng tử" },
      quiz: [
        {
          q: {
            en: "What is the single most honest description of what a quantum computer is?",
            vi: "Mô tả trung thực nhất về một máy tính lượng tử là gì?"
          },
          options: [
            { en: "A faster laptop that speeds up every program.", vi: "Một laptop nhanh hơn, tăng tốc mọi chương trình." },
            { en: "A specialized machine that beats classical computers only on a few structured problems.", vi: "Một cỗ máy chuyên dụng, chỉ thắng máy cổ điển ở vài bài toán có cấu trúc đặc biệt." },
            { en: "A computer that tries all answers at once and reads them all out.", vi: "Một máy thử mọi đáp án cùng lúc rồi đọc ra hết." },
            { en: "A finished technology already replacing data centers.", vi: "Một công nghệ hoàn thiện, đang thay thế các trung tâm dữ liệu." }
          ],
          answer: 1,
          explain: {
            en: "A quantum computer is a specialized device. For most everyday tasks it offers no advantage; its power is limited to problems with the right mathematical structure, such as factoring or simulating quantum systems.",
            vi: "Máy tính lượng tử là thiết bị chuyên dụng. Với hầu hết việc thường ngày nó không có lợi thế; sức mạnh chỉ giới hạn ở các bài toán có cấu trúc toán học phù hợp, như phân tích thừa số hay mô phỏng hệ lượng tử."
          }
        },
        {
          q: {
            en: "Which problem is a natural fit for a quantum computer?",
            vi: "Bài toán nào là mảnh đất tự nhiên cho máy tính lượng tử?"
          },
          options: [
            { en: "Sorting a list of a billion names alphabetically.", vi: "Sắp xếp một tỉ cái tên theo thứ tự chữ cái." },
            { en: "Simulating the behavior of molecules and materials.", vi: "Mô phỏng hành vi của phân tử và vật liệu." },
            { en: "Serving a web page to millions of users.", vi: "Phục vụ một trang web cho hàng triệu người dùng." },
            { en: "Storing large video files reliably.", vi: "Lưu trữ các tệp video lớn một cách tin cậy." }
          ],
          answer: 1,
          explain: {
            en: "Simulating quantum systems (chemistry, materials) is structurally hard classically because the state grows exponentially with system size - exactly the regime where a quantum computer is a natural tool. Sorting, serving, and storage are already efficient classically.",
            vi: "Mô phỏng hệ lượng tử (hoá học, vật liệu) khó về bản chất với máy cổ điển vì trạng thái tăng theo cấp số nhân với kích thước hệ - đúng lúc máy lượng tử trở thành công cụ tự nhiên. Sắp xếp, phục vụ web và lưu trữ đã hiệu quả sẵn trên máy cổ điển."
          }
        },
        {
          q: {
            en: "What best describes the state of the field today?",
            vi: "Điều gì mô tả đúng nhất tình hình lĩnh vực này hiện nay?"
          },
          options: [
            { en: "Large, error-corrected machines run useful jobs at scale.", vi: "Các máy lớn, đã sửa lỗi, chạy công việc hữu ích ở quy mô lớn." },
            { en: "The theory is proven but no hardware exists at all.", vi: "Lý thuyết đã chứng minh nhưng chưa có phần cứng nào." },
            { en: "Hardware is early: noisy devices and small numbers of error-corrected qubits, with broad usefulness still years away.", vi: "Phần cứng còn sơ khai: thiết bị nhiễu và số ít qubit đã sửa lỗi, còn nhiều năm nữa mới hữu ích rộng rãi." },
            { en: "Quantum computers have already broken all encryption.", vi: "Máy tính lượng tử đã phá vỡ mọi mã hoá." }
          ],
          answer: 2,
          explain: {
            en: "As of the mid-2020s the field is in a late-NISQ / early fault-tolerance phase: real hardware exists, error correction is being demonstrated on tens of logical qubits, but large-scale useful machines are still a late-2020s-to-2030s goal.",
            vi: "Đến giữa thập niên 2020, lĩnh vực ở giai đoạn cuối-NISQ / đầu chịu-lỗi: phần cứng thật đã có, việc sửa lỗi đang được trình diễn trên vài chục qubit logic, nhưng máy hữu ích quy mô lớn vẫn là mục tiêu của cuối 2020s tới 2030s."
          }
        }
      ]
    },
    {
      id: "l2-complex",
      minutes: 13,
      title: { en: "The complex numbers you actually need", vi: "Số phức bạn thực sự cần" },
      quiz: [
        {
          q: {
            en: "For z = 3 + 4i, what is |z|²?",
            vi: "Với z = 3 + 4i, |z|² bằng bao nhiêu?"
          },
          options: [
            { en: "7", vi: "7" },
            { en: "25", vi: "25" },
            { en: "5", vi: "5" },
            { en: "12", vi: "12" }
          ],
          answer: 1,
          explain: {
            en: "|z|² = z z* = a² + b² = 3² + 4² = 9 + 16 = 25. (The modulus itself is |z| = 5, but the squared modulus is 25.)",
            vi: "|z|² = z z* = a² + b² = 3² + 4² = 9 + 16 = 25. (Bản thân modulus là |z| = 5, còn bình phương modulus là 25.)"
          }
        },
        {
          q: {
            en: "Euler's formula says e^{iθ} equals:",
            vi: "Công thức Euler nói e^{iθ} bằng:"
          },
          options: [
            { en: "cos θ + i sin θ", vi: "cos θ + i sin θ" },
            { en: "sin θ + i cos θ", vi: "sin θ + i cos θ" },
            { en: "cos θ − i sin θ", vi: "cos θ − i sin θ" },
            { en: "1 + iθ", vi: "1 + iθ" }
          ],
          answer: 0,
          explain: {
            en: "Euler's formula is e^{iθ} = cos θ + i sin θ. It traces the unit circle in the complex plane, so |e^{iθ}| = 1 for every real θ - which is why a phase factor never changes a magnitude.",
            vi: "Công thức Euler là e^{iθ} = cos θ + i sin θ. Nó vẽ đường tròn đơn vị trong mặt phẳng phức, nên |e^{iθ}| = 1 với mọi θ thực - vì thế một hệ số pha không bao giờ đổi độ lớn."
          }
        },
        {
          q: {
            en: "Why does a phase factor e^{iθ} matter in quantum computing even though |e^{iθ}| = 1?",
            vi: "Vì sao hệ số pha e^{iθ} lại quan trọng trong điện toán lượng tử dù |e^{iθ}| = 1?"
          },
          options: [
            { en: "It changes the probability of each single outcome directly.", vi: "Nó đổi trực tiếp xác suất của từng kết quả đơn lẻ." },
            { en: "A relative phase between amplitudes changes how they add and interfere, even though it leaves each single probability alone.", vi: "Một pha tương đối giữa các biên độ làm đổi cách chúng cộng và giao thoa, dù không đổi từng xác suất đơn lẻ." },
            { en: "It makes the qubit hotter.", vi: "Nó làm qubit nóng hơn." },
            { en: "It has no effect at all; phase is just bookkeeping.", vi: "Nó chẳng có tác dụng gì; pha chỉ là ghi sổ." }
          ],
          answer: 1,
          explain: {
            en: "A single amplitude's phase is invisible on its own, but a relative phase between two amplitudes controls whether they reinforce or cancel when combined. Interference - the heart of quantum algorithms - lives in these phases.",
            vi: "Pha của một biên độ đơn thì tự nó vô hình, nhưng pha tương đối giữa hai biên độ quyết định chúng cộng hưởng hay triệt tiêu khi kết hợp. Giao thoa - trái tim của thuật toán lượng tử - nằm ở các pha này."
          }
        }
      ]
    },
    {
      id: "l3-vectors",
      minutes: 13,
      title: { en: "Vectors, kets, and inner products", vi: "Vector, ket, và tích trong" },
      quiz: [
        {
          q: {
            en: "The bra ⟨ψ| is obtained from the ket |ψ⟩ by:",
            vi: "Bra ⟨ψ| được lấy từ ket |ψ⟩ bằng cách:"
          },
          options: [
            { en: "Transposing to a row and taking the complex conjugate of each entry.", vi: "Chuyển thành hàng và lấy liên hợp phức của từng phần tử." },
            { en: "Just writing the same column vector.", vi: "Chỉ cần viết lại đúng vector cột đó." },
            { en: "Multiplying every entry by i.", vi: "Nhân mỗi phần tử với i." },
            { en: "Reversing the order of the entries.", vi: "Đảo ngược thứ tự các phần tử." }
          ],
          answer: 0,
          explain: {
            en: "The bra is the conjugate transpose (dagger) of the ket: turn the column into a row and conjugate each entry. This is what makes ⟨ψ|ψ⟩ = |α|² + |β|² a real, non-negative number.",
            vi: "Bra là chuyển vị liên hợp (dagger) của ket: biến cột thành hàng rồi liên hợp từng phần tử. Chính điều này khiến ⟨ψ|ψ⟩ = |α|² + |β|² là một số thực, không âm."
          }
        },
        {
          q: {
            en: "The states |0⟩ and |1⟩ satisfy ⟨0|1⟩ = 0 and ⟨0|0⟩ = 1. What does this say?",
            vi: "Các trạng thái |0⟩ và |1⟩ thoả ⟨0|1⟩ = 0 và ⟨0|0⟩ = 1. Điều này nói lên gì?"
          },
          options: [
            { en: "They are parallel.", vi: "Chúng song song." },
            { en: "They form an orthonormal basis: mutually orthogonal and each of unit length.", vi: "Chúng tạo thành một cơ sở trực chuẩn: trực giao với nhau và mỗi cái có độ dài đơn vị." },
            { en: "They are the same state.", vi: "Chúng là cùng một trạng thái." },
            { en: "Their inner product is undefined.", vi: "Tích trong của chúng không xác định." }
          ],
          answer: 1,
          explain: {
            en: "⟨0|0⟩ = ⟨1|1⟩ = 1 means each is normalized; ⟨0|1⟩ = 0 means they are orthogonal. Together: an orthonormal basis, the standard 'coordinate axes' for a qubit.",
            vi: "⟨0|0⟩ = ⟨1|1⟩ = 1 nghĩa là mỗi cái đã chuẩn hoá; ⟨0|1⟩ = 0 nghĩa là chúng trực giao. Gộp lại: một cơ sở trực chuẩn, 'trục toạ độ' chuẩn cho một qubit."
          }
        },
        {
          q: {
            en: "For |ψ⟩ = α|0⟩ + β|1⟩, the normalization condition ‖ψ‖ = 1 is the same as:",
            vi: "Với |ψ⟩ = α|0⟩ + β|1⟩, điều kiện chuẩn hoá ‖ψ‖ = 1 tương đương với:"
          },
          options: [
            { en: "α + β = 1", vi: "α + β = 1" },
            { en: "⟨ψ|ψ⟩ = |α|² + |β|² = 1", vi: "⟨ψ|ψ⟩ = |α|² + |β|² = 1" },
            { en: "α = β", vi: "α = β" },
            { en: "|α| + |β| = 1", vi: "|α| + |β| = 1" }
          ],
          answer: 1,
          explain: {
            en: "The norm is ‖ψ‖ = √⟨ψ|ψ⟩, and ⟨ψ|ψ⟩ = |α|² + |β|². Requiring the norm to be 1 is exactly |α|² + |β|² = 1 - the same normalization rule you saw for qubit states.",
            vi: "Chuẩn là ‖ψ‖ = √⟨ψ|ψ⟩, và ⟨ψ|ψ⟩ = |α|² + |β|². Yêu cầu chuẩn bằng 1 chính là |α|² + |β|² = 1 - đúng quy tắc chuẩn hoá bạn đã gặp cho trạng thái qubit."
          }
        }
      ]
    },
    {
      id: "l4-probability",
      minutes: 12,
      title: { en: "Probability, and how quantum differs", vi: "Xác suất, và điểm khác của lượng tử" },
      quiz: [
        {
          q: {
            en: "In quantum mechanics, the probability of an outcome is obtained from its amplitude by:",
            vi: "Trong cơ học lượng tử, xác suất của một kết quả được lấy từ biên độ của nó bằng cách:"
          },
          options: [
            { en: "Taking the amplitude directly as the probability.", vi: "Lấy thẳng biên độ làm xác suất." },
            { en: "Taking the squared magnitude |amplitude|² (the Born rule).", vi: "Lấy bình phương độ lớn |biên độ|² (quy tắc Born)." },
            { en: "Adding the amplitudes.", vi: "Cộng các biên độ." },
            { en: "Taking the real part of the amplitude.", vi: "Lấy phần thực của biên độ." }
          ],
          answer: 1,
          explain: {
            en: "The Born rule: the probability of an outcome equals the squared magnitude of its amplitude. Amplitudes can be complex and negative; squaring the magnitude always gives a valid probability in [0,1].",
            vi: "Quy tắc Born: xác suất của một kết quả bằng bình phương độ lớn của biên độ. Biên độ có thể phức và âm; bình phương độ lớn luôn cho một xác suất hợp lệ trong [0,1]."
          }
        },
        {
          q: {
            en: "What can amplitudes do that ordinary classical probabilities cannot?",
            vi: "Biên độ làm được điều gì mà xác suất cổ điển thông thường không làm được?"
          },
          options: [
            { en: "Be larger than 1.", vi: "Lớn hơn 1." },
            { en: "Cancel each other (destructive interference), because they are complex numbers with sign/phase.", vi: "Triệt tiêu lẫn nhau (giao thoa triệt tiêu), vì chúng là số phức có dấu/pha." },
            { en: "Always add up to more than 1.", vi: "Luôn cộng lại lớn hơn 1." },
            { en: "Be measured directly.", vi: "Được đo trực tiếp." }
          ],
          answer: 1,
          explain: {
            en: "Classical probabilities are non-negative and only ever add, so combining paths can only increase or keep a probability. Amplitudes carry a sign/phase and can cancel, so two ways of reaching an outcome can wipe each other out. That is interference.",
            vi: "Xác suất cổ điển không âm và chỉ cộng, nên gộp các đường chỉ làm tăng hoặc giữ nguyên xác suất. Biên độ mang dấu/pha và có thể triệt tiêu, nên hai cách đi tới một kết quả có thể xoá lẫn nhau. Đó là giao thoa."
          }
        },
        {
          q: {
            en: "Two paths reach an outcome with amplitudes +1/√2 and −1/√2. What is the outcome's probability?",
            vi: "Hai đường đi tới một kết quả với biên độ +1/√2 và −1/√2. Xác suất của kết quả đó là bao nhiêu?"
          },
          options: [
            { en: "1", vi: "1" },
            { en: "1/2", vi: "1/2" },
            { en: "0 - the amplitudes cancel before squaring.", vi: "0 - các biên độ triệt tiêu trước khi bình phương." },
            { en: "1/4", vi: "1/4" }
          ],
          answer: 2,
          explain: {
            en: "You add amplitudes first: +1/√2 + (−1/√2) = 0. Then square: |0|² = 0. The outcome never happens. Squaring each path separately (giving 1/2 + 1/2 = 1) would be the classical mistake that ignores interference.",
            vi: "Cộng biên độ trước: +1/√2 + (−1/√2) = 0. Rồi bình phương: |0|² = 0. Kết quả không bao giờ xảy ra. Bình phương từng đường riêng (ra 1/2 + 1/2 = 1) là lỗi cổ điển bỏ qua giao thoa."
          }
        }
      ]
    },
    {
      id: "l5-linear-maps",
      minutes: 14,
      title: { en: "Operations as matrices", vi: "Phép biến đổi là ma trận" },
      quiz: [
        {
          q: {
            en: "Applying the matrix X = [[0,1],[1,0]] to |0⟩ = (1,0)ᵀ gives:",
            vi: "Áp dụng ma trận X = [[0,1],[1,0]] lên |0⟩ = (1,0)ᵀ cho:"
          },
          options: [
            { en: "|0⟩", vi: "|0⟩" },
            { en: "|1⟩ = (0,1)ᵀ", vi: "|1⟩ = (0,1)ᵀ" },
            { en: "(1,1)ᵀ", vi: "(1,1)ᵀ" },
            { en: "The zero vector.", vi: "Vector không." }
          ],
          answer: 1,
          explain: {
            en: "X (1,0)ᵀ = (0·1 + 1·0, 1·1 + 0·0)ᵀ = (0,1)ᵀ = |1⟩. X is the quantum NOT gate: it swaps |0⟩ and |1⟩.",
            vi: "X (1,0)ᵀ = (0·1 + 1·0, 1·1 + 0·0)ᵀ = (0,1)ᵀ = |1⟩. X là cổng NOT lượng tử: nó hoán đổi |0⟩ và |1⟩."
          }
        },
        {
          q: {
            en: "A matrix U is called unitary when:",
            vi: "Một ma trận U được gọi là unitary (đơn nhất) khi:"
          },
          options: [
            { en: "All its entries are real.", vi: "Mọi phần tử của nó đều thực." },
            { en: "U†U = I, i.e. its conjugate transpose is its inverse.", vi: "U†U = I, tức chuyển vị liên hợp của nó là nghịch đảo của nó." },
            { en: "Its determinant is zero.", vi: "Định thức của nó bằng không." },
            { en: "It is symmetric.", vi: "Nó đối xứng." }
          ],
          answer: 1,
          explain: {
            en: "Unitary means U†U = UU† = I. Equivalently, U preserves inner products and lengths, so it maps normalized states to normalized states and is always invertible (reversible).",
            vi: "Unitary nghĩa là U†U = UU† = I. Tương đương, U bảo toàn tích trong và độ dài, nên nó ánh xạ trạng thái chuẩn hoá thành trạng thái chuẩn hoá và luôn khả nghịch (đảo ngược được)."
          }
        },
        {
          q: {
            en: "Why must the operations (gates) that act on qubits be unitary?",
            vi: "Vì sao các phép toán (cổng) tác động lên qubit phải là unitary?"
          },
          options: [
            { en: "To make them run faster.", vi: "Để chạy nhanh hơn." },
            { en: "To keep total probability equal to 1 (preserve normalization) and stay reversible.", vi: "Để giữ tổng xác suất bằng 1 (bảo toàn chuẩn hoá) và giữ tính đảo ngược." },
            { en: "So they can only ever produce |0⟩.", vi: "Để chúng chỉ có thể tạo ra |0⟩." },
            { en: "Because unitary matrices are always diagonal.", vi: "Vì ma trận unitary luôn là ma trận chéo." }
          ],
          answer: 1,
          explain: {
            en: "A valid state must stay normalized (|α|² + |β|² = 1). Unitary maps are exactly the linear maps that preserve this length, and they are automatically reversible - matching the fact that quantum evolution (apart from measurement) is reversible.",
            vi: "Một trạng thái hợp lệ phải luôn chuẩn hoá (|α|² + |β|² = 1). Ánh xạ unitary chính là các ánh xạ tuyến tính bảo toàn độ dài này, và chúng tự động đảo ngược được - khớp với sự thật rằng tiến hoá lượng tử (trừ phép đo) là đảo ngược được."
          }
        }
      ]
    }
  ]
});
