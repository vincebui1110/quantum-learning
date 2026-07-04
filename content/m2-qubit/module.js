/* Module 2 - The Qubit  (gold-standard reference module) */
QP.registerModule({
  id: "m2-qubit",
  order: 2,
  accent: "#6B34D4",
  title: { en: "The Qubit", vi: "Qubit" },
  subtitle: {
    en: "The single quantum bit: state vectors, amplitudes, measurement, phase, and the Bloch sphere - the object every later idea is built on.",
    vi: "Bit lượng tử đơn: vector trạng thái, biên độ, phép đo, pha, và mặt cầu Bloch - đối tượng nền tảng cho mọi ý tưởng về sau."
  },
  lessons: [
    {
      id: "l1-state",
      minutes: 12,
      title: { en: "The state of a qubit", vi: "Trạng thái của một qubit" },
      quiz: [
        {
          q: {
            en: "A qubit is in the state |ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩. Is this a valid quantum state?",
            vi: "Một qubit ở trạng thái |ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩. Đây có phải trạng thái lượng tử hợp lệ không?"
          },
          options: [
            { en: "Yes - the squared amplitudes 9/25 and 16/25 sum to 1.", vi: "Có - bình phương biên độ 9/25 và 16/25 cộng lại bằ 1." },
            { en: "No - the amplitudes 3/5 and 4/5 do not sum to 1.", vi: "Không - biên độ 3/5 và 4/5 cộng lại không bằng 1." },
            { en: "No - amplitudes must be equal for a valid state.", vi: "Không - các biên độ phải bằng nhau thì trạng thái mới hợp lệ." },
            { en: "Only if it is measured first.", vi: "Chỉ khi nó được đo trước đã." }
          ],
          answer: 0,
          explain: {
            en: "Normalization requires |α|² + |β|² = 1, not α + β = 1. Here (3/5)² + (4/5)² = 9/25 + 16/25 = 1. Valid.",
            vi: "Điều kiện chuẩn hoá là |α|² + |β|² = 1, không phải α + β = 1. Ở đây (3/5)² + (4/5)² = 9/25 + 16/25 = 1. Hợp lệ."
          }
        },
        {
          q: {
            en: "What does the amplitude α in |ψ⟩ = α|0⟩ + β|1⟩ directly tell you?",
            vi: "Biên độ α trong |ψ⟩ = α|0⟩ + β|1⟩ cho bạn biết trực tiếp điều gì?"
          },
          options: [
            { en: "The probability of measuring 0 is exactly α.", vi: "Xác suất đo được 0 đúng bằng α." },
            { en: "Nothing measurable until you square its magnitude: |α|² is the probability of measuring 0.", vi: "Chưa đo được gì cho tới khi bình phương độ lớn: |α|² là xác suất đo được 0." },
            { en: "The qubit is definitely in state |0⟩.", vi: "Qubit chắc chắn ở trạng thái |0⟩." },
            { en: "The energy of the qubit.", vi: "Năng lượng của qubit." }
          ],
          answer: 1,
          explain: {
            en: "Amplitudes are complex numbers, not probabilities. The Born rule says the probability of outcome 0 is |α|². The amplitude carries extra information (a phase) that probability alone loses.",
            vi: "Biên độ là số phức, không phải xác suất. Quy tắc Born nói xác suất kết quả 0 là |α|². Biên độ mang thêm thông tin (pha) mà chỉ xác suất sẽ đánh mất."
          }
        }
      ]
    },
    {
      id: "l2-measurement",
      minutes: 13,
      title: { en: "Measurement and the Born rule", vi: "Phép đo và quy tắc Born" },
      quiz: [
        {
          q: {
            en: "A qubit is in |+⟩ = (1/√2)(|0⟩ + |1⟩). You measure it in the standard basis, get 1, then immediately measure again. What do you get the second time?",
            vi: "Một qubit ở |+⟩ = (1/√2)(|0⟩ + |1⟩). Bạn đo trong cơ sở chuẩn, được 1, rồi đo lại ngay. Lần đo thứ hai được gì?"
          },
          options: [
            { en: "50/50 again - each measurement is independent.", vi: "Lại 50/50 - mỗi lần đo độc lập nhau." },
            { en: "1 with certainty - the first measurement collapsed the state to |1⟩.", vi: "Chắc chắn là 1 - lần đo đầu đã làm sập trạng thái về |1⟩." },
            { en: "0 with certainty.", vi: "Chắc chắn là 0." },
            { en: "It is impossible to measure the same qubit twice.", vi: "Không thể đo cùng một qubit hai lần." }
          ],
          answer: 1,
          explain: {
            en: "Measurement collapses the state onto the outcome found. After getting 1, the qubit is in |1⟩, so every subsequent standard-basis measurement gives 1 - until some gate moves it again.",
            vi: "Phép đo làm sập trạng thái về đúng kết quả tìm được. Sau khi được 1, qubit ở |1⟩, nên mọi lần đo cơ sở chuẩn tiếp theo đều cho 1 - cho tới khi một cổng nào đó dịch chuyển nó."
          }
        },
        {
          q: {
            en: "Two states |ψ⟩ = (1/√2)(|0⟩ + |1⟩) and |φ⟩ = (1/√2)(|0⟩ − |1⟩) give identical measurement statistics in the standard basis. Are they the same state?",
            vi: "Hai trạng thái |ψ⟩ = (1/√2)(|0⟩ + |1⟩) và |φ⟩ = (1/√2)(|0⟩ − |1⟩) cho thống kê đo giống hệt nhau trong cơ sở chuẩn. Chúng có phải cùng một trạng thái không?"
          },
          options: [
            { en: "Yes - same probabilities means same state.", vi: "Có - cùng xác suất nghĩa là cùng trạng thái." },
            { en: "No - the relative sign (phase) makes them physically distinct; a Hadamard tells them apart.", vi: "Không - dấu tương đối (pha) khiến chúng khác nhau về vật lý; một cổng Hadamard phân biệt được." },
            { en: "No, but no experiment could ever distinguish them.", vi: "Không, nhưng không thí nghiệm nào phân biệt được." },
            { en: "Only if measured in the standard basis.", vi: "Chỉ khi đo trong cơ sở chuẩn." }
          ],
          answer: 1,
          explain: {
            en: "They are |+⟩ and |−⟩. The relative phase (the minus sign) is invisible to a standard-basis measurement but very real: apply H and |+⟩→|0⟩ while |−⟩→|1⟩, giving opposite, certain outcomes.",
            vi: "Đó là |+⟩ và |−⟩. Pha tương đối (dấu trừ) vô hình với phép đo cơ sở chuẩn nhưng rất thật: áp dụng H thì |+⟩→|0⟩ còn |−⟩→|1⟩, cho kết quả chắc chắn và ngược nhau."
          }
        }
      ]
    },
    {
      id: "l3-bloch",
      minutes: 14,
      title: { en: "Global phase, relative phase, and the Bloch sphere", vi: "Pha toàn cục, pha tương đối, và mặt cầu Bloch" },
      quiz: [
        {
          q: {
            en: "Which change to a qubit's state is physically undetectable by any measurement?",
            vi: "Thay đổi nào lên trạng thái qubit là không thể phát hiện bằng bất kỳ phép đo nào?"
          },
          options: [
            { en: "Multiplying the whole state by a global phase e^{iγ}.", vi: "Nhân toàn bộ trạng thái với một pha toàn cục e^{iγ}." },
            { en: "Changing the relative phase between |0⟩ and |1⟩.", vi: "Đổi pha tương đối giữa |0⟩ và |1⟩." },
            { en: "Changing the magnitudes of the amplitudes.", vi: "Đổi độ lớn của các biên độ." },
            { en: "Applying a Hadamard gate.", vi: "Áp dụng cổng Hadamard." }
          ],
          answer: 0,
          explain: {
            en: "A global phase e^{iγ}|ψ⟩ never affects any probability, in any basis - it is physically meaningless. Relative phase, by contrast, is observable. On the Bloch sphere, global phase is exactly the information thrown away.",
            vi: "Pha toàn cục e^{iγ}|ψ⟩ không bao giờ ảnh hưởng xác suất nào, trong bất kỳ cơ sở nào - nó vô nghĩa về vật lý. Ngược lại, pha tương đối quan sát được. Trên mặt cầu Bloch, pha toàn cục chính là thông tin bị bỏ đi."
          }
        },
        {
          q: {
            en: "On the Bloch sphere, where does the state |0⟩ sit?",
            vi: "Trên mặt cầu Bloch, trạng thái |0⟩ nằm ở đâu?"
          },
          options: [
            { en: "At the north pole.", vi: "Ở cực bắc." },
            { en: "At the south pole.", vi: "Ở cực nam." },
            { en: "On the equator.", vi: "Trên đường xích đạo." },
            { en: "At the centre of the sphere.", vi: "Ở tâm mặt cầu." }
          ],
          answer: 0,
          explain: {
            en: "By convention |0⟩ is the north pole and |1⟩ the south pole. Equal superpositions like |+⟩ and |−⟩ sit on the equator, distinguished by their angle around it (their relative phase).",
            vi: "Theo quy ước |0⟩ là cực bắc và |1⟩ là cực nam. Các chồng chập đều như |+⟩ và |−⟩ nằm trên xích đạo, phân biệt bởi góc quanh xích đạo (pha tương đối của chúng)."
          }
        }
      ]
    },
    {
      id: "l4-not-a-coin",
      minutes: 11,
      title: { en: "Why a qubit is not just a random bit", vi: "Vì sao qubit không chỉ là một bit ngẫu nhiên" },
      quiz: [
        {
          q: {
            en: "The 'a qubit is secretly already 0 or 1, we just don't know which' picture fails because...",
            vi: "Hình dung 'qubit thực ra đã là 0 hoặc 1 sẵn, chỉ là ta chưa biết' sai vì..."
          },
          options: [
            { en: "...amplitudes can cancel (interfere), which a hidden pre-set value can never do.", vi: "...biên độ có thể triệt tiêu nhau (giao thoa), điều mà một giá trị định sẵn ẩn không bao giờ làm được." },
            { en: "...qubits are always exactly 0.", vi: "...qubit luôn đúng bằng 0." },
            { en: "...measurement is deterministic.", vi: "...phép đo là tất định." },
            { en: "...hidden values are actually correct.", vi: "...giá trị ẩn thực ra đúng." }
          ],
          answer: 0,
          explain: {
            en: "Interference: apply H to |0⟩ to reach |+⟩, then H again and you get |0⟩ with certainty. A classical coin flipped twice would stay random. The reappearance of certainty proves the amplitudes (with signs) were really there, not a hidden fixed bit.",
            vi: "Giao thoa: áp dụng H lên |0⟩ để ra |+⟩, rồi H lần nữa thì được |0⟩ chắc chắn. Một đồng xu cổ điển tung hai lần vẫn ngẫu nhiên. Sự tái xuất của tính chắc chắn chứng minh các biên độ (kèm dấu) thực sự tồn tại, không phải một bit ẩn cố định."
          }
        }
      ]
    }
  ]
});
